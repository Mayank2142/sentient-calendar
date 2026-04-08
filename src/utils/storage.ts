/**
 * Storage utilities for client-side persistence
 * Supports both localStorage and IndexedDB for optimal performance
 */

/**
 * Save data to localStorage
 */
export function saveToLocalStorage<T>(key: string, data: T): void {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`[Storage] Failed to save ${key}:`, error);
  }
}

/**
 * Load data from localStorage
 */
export function loadFromLocalStorage<T>(key: string, defaultValue?: T): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue || null;
  } catch (error) {
    console.error(`[Storage] Failed to load ${key}:`, error);
    return defaultValue || null;
  }
}

/**
 * Remove data from localStorage
 */
export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`[Storage] Failed to remove ${key}:`, error);
  }
}

/**
 * Clear all localStorage items
 */
export function clearLocalStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error(`[Storage] Failed to clear localStorage:`, error);
  }
}

/**
 * IndexedDB operations
 */
export async function initIndexedDB(
  dbName: string,
  version: number = 1,
  stores: Record<string, string> = {}
): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      Object.entries(stores).forEach(([storeName, keyPath]) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath });
        }
      });
    };
  });
}

/**
 * Save data to IndexedDB
 */
export async function saveToIndexedDB(
  dbName: string,
  storeName: string,
  data: any
): Promise<void> {
  try {
    const db = await initIndexedDB(dbName);
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error(`[IndexedDB] Failed to save to ${storeName}:`, error);
  }
}

/**
 * Load data from IndexedDB
 */
export async function loadFromIndexedDB<T>(
  dbName: string,
  storeName: string,
  key: string
): Promise<T | null> {
  try {
    const db = await initIndexedDB(dbName);
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error(`[IndexedDB] Failed to load from ${storeName}:`, error);
    return null;
  }
}

/**
 * Query all items from IndexedDB
 */
export async function queryIndexedDB<T>(
  dbName: string,
  storeName: string
): Promise<T[]> {
  try {
    const db = await initIndexedDB(dbName);
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error(`[IndexedDB] Failed to query ${storeName}:`, error);
    return [];
  }
}

/**
 * Delete from IndexedDB
 */
export async function deleteFromIndexedDB(
  dbName: string,
  storeName: string,
  key: string
): Promise<void> {
  try {
    const db = await initIndexedDB(dbName);
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error(`[IndexedDB] Failed to delete from ${storeName}:`, error);
  }
}

/**
 * Clear all items from IndexedDB
 */
export async function clearIndexedDB(
  dbName: string,
  storeName: string
): Promise<void> {
  try {
    const db = await initIndexedDB(dbName);
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error(`[IndexedDB] Failed to clear ${storeName}:`, error);
  }
}

/**
 * Check if IndexedDB is available
 */
export function isIndexedDBAvailable(): boolean {
  try {
    return !!indexedDB;
  } catch {
    return false;
  }
}

/**
 * Check if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const test = '__test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}
