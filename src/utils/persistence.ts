/**
 * Data persistence utilities
 * Handles localStorage, SessionStorage, and IndexedDB for offline-first calendar
 */

const STORAGE_PREFIX = 'sentient-calendar_';
const DB_NAME = 'sentient-calendar-db';
const STORE_NAME = 'calendar-data';

interface StorageOptions {
  version?: number;
  encrypt?: boolean;
  expiry?: number; // in milliseconds
}

interface StorageData<T> {
  data: T;
  timestamp: number;
  version: number;
  expiry?: number;
}

/**
 * LocalStorage wrapper with versioning and expiry
 */
export const localStorage_Wrapper = {
  /**
   * Set item in localStorage
   */
  setItem<T>(key: string, value: T, options: StorageOptions = {}): void {
    try {
      const storageData: StorageData<T> = {
        data: value,
        timestamp: Date.now(),
        version: options.version || 1,
        expiry: options.expiry ? Date.now() + options.expiry : undefined,
      };

      const serialized = JSON.stringify(storageData);
      window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, serialized);
    } catch (error) {
      console.error(`Failed to save to localStorage: ${key}`, error);
    }
  },

  /**
   * Get item from localStorage
   */
  getItem<T>(key: string, expectedVersion = 1): T | null {
    try {
      const item = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`);

      if (!item) return null;

      const storageData: StorageData<T> = JSON.parse(item);

      // Check expiry
      if (storageData.expiry && Date.now() > storageData.expiry) {
        window.localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
        return null;
      }

      // Check version
      if (storageData.version !== expectedVersion) {
        console.warn(
          `Version mismatch for ${key}: expected ${expectedVersion}, got ${storageData.version}`
        );
        return null;
      }

      return storageData.data;
    } catch (error) {
      console.error(`Failed to retrieve from localStorage: ${key}`, error);
      return null;
    }
  },

  /**
   * Remove item from localStorage
   */
  removeItem(key: string): void {
    try {
      window.localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    } catch (error) {
      console.error(`Failed to remove from localStorage: ${key}`, error);
    }
  },

  /**
   * Clear all app data from localStorage
   */
  clear(): void {
    try {
      const keys = Object.keys(window.localStorage);
      keys.forEach((key) => {
        if (key.startsWith(STORAGE_PREFIX)) {
          window.localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear localStorage', error);
    }
  },

  /**
   * Get all stored keys
   */
  getAllKeys(): string[] {
    try {
      return Object.keys(window.localStorage)
        .filter((key) => key.startsWith(STORAGE_PREFIX))
        .map((key) => key.replace(STORAGE_PREFIX, ''));
    } catch (error) {
      console.error('Failed to get localStorage keys', error);
      return [];
    }
  },
};

/**
 * IndexedDB wrapper for larger data storage
 */
export const indexedDB_Wrapper = {
  /**
   * Initialize database
   */
  async initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(DB_NAME, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
    });
  },

  /**
   * Save data to IndexedDB
   */
  async setItem<T extends { id: string }>(
    key: string,
    value: T,
    options: StorageOptions = {}
  ): Promise<void> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const storageData: StorageData<T> = {
        data: value,
        timestamp: Date.now(),
        version: options.version || 1,
        expiry: options.expiry ? Date.now() + options.expiry : undefined,
      };

      const data = {
        id: key,
        ...storageData,
      };

      return new Promise((resolve, reject) => {
        const request = store.put(data);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    } catch (error) {
      console.error(`Failed to save to IndexedDB: ${key}`, error);
    }
  },

  /**
   * Get data from IndexedDB
   */
  async getItem<T>(key: string, expectedVersion = 1): Promise<T | null> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);

      return new Promise((resolve, reject) => {
        const request = store.get(key);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const result = request.result;

          if (!result) {
            resolve(null);
            return;
          }

          // Check expiry
          if (result.expiry && Date.now() > result.expiry) {
            this.removeItem(key);
            resolve(null);
            return;
          }

          // Check version
          if (result.version !== expectedVersion) {
            console.warn(
              `Version mismatch for ${key}: expected ${expectedVersion}, got ${result.version}`
            );
            resolve(null);
            return;
          }

          resolve(result.data);
        };
      });
    } catch (error) {
      console.error(`Failed to retrieve from IndexedDB: ${key}`, error);
      return null;
    }
  },

  /**
   * Remove item from IndexedDB
   */
  async removeItem(key: string): Promise<void> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      return new Promise((resolve, reject) => {
        const request = store.delete(key);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    } catch (error) {
      console.error(`Failed to remove from IndexedDB: ${key}`, error);
    }
  },

  /**
   * Clear all data from IndexedDB
   */
  async clear(): Promise<void> {
    try {
      const db = await this.initDB();
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      return new Promise((resolve, reject) => {
        const request = store.clear();
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    } catch (error) {
      console.error('Failed to clear IndexedDB', error);
    }
  },
};

/**
 * Smart storage selector (auto-selects based on data size)
 */
export const SmartStorage = {
  /**
   * Determine optimal storage method
   */
  getOptimalStorage<T>(data: T): 'localStorage' | 'indexedDB' {
    const size = new Blob([JSON.stringify(data)]).size;
    // Use IndexedDB for data larger than 1MB
    return size > 1024 * 1024 ? 'indexedDB' : 'localStorage';
  },

  /**
   * Save data using optimal storage
   */
  async setItem<T>(key: string, value: T, options: StorageOptions = {}): Promise<void> {
    const storage = this.getOptimalStorage(value);

    if (storage === 'indexedDB') {
      return indexedDB_Wrapper.setItem(key, value as any, options);
    } else {
      localStorage_Wrapper.setItem(key, value, options);
    }
  },

  /**
   * Get data from optimal storage
   */
  async getItem<T>(key: string, expectedVersion = 1): Promise<T | null> {
    // Try localStorage first (faster)
    const localData = localStorage_Wrapper.getItem<T>(key, expectedVersion);
    if (localData) return localData;

    // Fall back to IndexedDB
    return indexedDB_Wrapper.getItem<T>(key, expectedVersion);
  },

  /**
   * Remove item from all storages
   */
  async removeItem(key: string): Promise<void> {
    localStorage_Wrapper.removeItem(key);
    await indexedDB_Wrapper.removeItem(key);
  },

  /**
   * Clear all data
   */
  async clear(): Promise<void> {
    localStorage_Wrapper.clear();
    await indexedDB_Wrapper.clear();
  },
};

/**
 * Data backup and restore
 */
export const BackupManager = {
  /**
   * Create backup of all calendar data
   */
  async createBackup(data: any): Promise<Blob> {
    const backup = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      data,
    };

    return new Blob([JSON.stringify(backup, null, 2)], {
      type: 'application/json',
    });
  },

  /**
   * Restore from backup
   */
  async restoreBackup(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const backup = JSON.parse(content);

          if (!backup.version || !backup.data) {
            throw new Error('Invalid backup format');
          }

          resolve(backup.data);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  },

  /**
   * Schedule automatic backups
   */
  scheduleAutoBackup(
    callback: () => Promise<Blob>,
    interval: number = 24 * 60 * 60 * 1000 // 24 hours
  ): () => void {
    const backupInterval = setInterval(() => {
      callback();
    }, interval);

    return () => clearInterval(backupInterval);
  },
};

/**
 * Session management
 */
export const SessionManager = {
  /**
   * Start new session
   */
  startSession(): string {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage_Wrapper.setItem('currentSession', sessionId);
    return sessionId;
  },

  /**
   * Get current session
   */
  getCurrentSession(): string | null {
    return localStorage_Wrapper.getItem('currentSession');
  },

  /**
   * End session
   */
  endSession(): void {
    localStorage_Wrapper.removeItem('currentSession');
  },

  /**
   * Check if session is active
   */
  isSessionActive(): boolean {
    return localStorage_Wrapper.getItem('currentSession') !== null;
  },
};
