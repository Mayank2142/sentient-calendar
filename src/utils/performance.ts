/**
 * Performance optimization utilities
 * Includes memoization, debouncing, throttling, and lazy loading
 */

/**
 * Debounce function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;

  return function debounced(...args: Parameters<T>) {
    lastArgs = args;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...lastArgs!);
      timeout = null;
    }, wait);
  };
}

/**
 * Throttle function calls
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function throttled(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Simple memoization for pure functions
 */
export function memoize<T extends (...args: any[]) => any>(func: T): T {
  const cache = new Map();

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func(...args);
    cache.set(key, result);

    return result;
  }) as T;
}

/**
 * LRU (Least Recently Used) cache for expensive computations
 */
export class LRUCache<K, V> {
  private cache: Map<K, V>;
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);

    if (value !== undefined) {
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, value);
    }

    return value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

/**
 * Lazy load images with intersection observer
 */
export function lazyLoadImages(selector: string = 'img[data-src]'): void {
  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers that don't support IntersectionObserver
    const images = document.querySelectorAll(selector);
    images.forEach((img) => {
      const src = (img as HTMLImageElement).dataset.src;
      if (src) {
        (img as HTMLImageElement).src = src;
      }
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;

        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll(selector).forEach((img) => {
    observer.observe(img);
  });
}

/**
 * Performance metrics tracker
 */
export const PerformanceMetrics = {
  /**
   * Measure function execution time
   */
  measure: async <T>(
    name: string,
    fn: () => Promise<T> | T
  ): Promise<{ result: T; duration: number }> => {
    const start = performance.now();
    const result = await fn();
    const duration = performance.now() - start;

    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);

    return { result, duration };
  },

  /**
   * Get Core Web Vitals
   */
  getCoreWebVitals: (): {
    fcp?: number;
    lcp?: number;
    cls?: number;
    fid?: number;
  } => {
    const vitals: any = {};

    // First Contentful Paint
    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach((entry) => {
      if (entry.name === 'first-contentful-paint') {
        vitals.fcp = entry.startTime;
      }
    });

    // Largest Contentful Paint
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
    if (lcpEntries.length > 0) {
      vitals.lcp = lcpEntries[lcpEntries.length - 1].startTime;
    }

    // Cumulative Layout Shift
    if ('PerformanceObserver' in window) {
      try {
        const clsEntries = performance.getEntriesByType('layout-shift');
        let cls = 0;
        clsEntries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        });
        vitals.cls = cls;
      } catch (e) {
        // CLS might not be available
      }
    }

    return vitals;
  },

  /**
   * Get memory usage (if available)
   */
  getMemoryUsage: (): { usedJSHeapSize?: number; totalJSHeapSize?: number } => {
    const memory = (performance as any).memory;

    if (memory) {
      return {
        usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576), // MB
        totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576), // MB
      };
    }

    return {};
  },

  /**
   * Report metrics
   */
  reportMetrics: (callback: (vitals: any) => void) => {
    if ('web-vital' in window) {
      // Use web-vitals library if available
      const vitals = PerformanceMetrics.getCoreWebVitals();
      callback(vitals);
    }
  },
};

/**
 * Request animation frame wrapper
 */
export const requestAnimationFrameThrottle = (callback: FrameRequestCallback): (() => void) => {
  let rafId: number | null = null;

  return () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }

    rafId = requestAnimationFrame(callback);
  };
};

/**
 * Virtual scrolling helper for large lists
 */
export class VirtualScroller {
  private itemHeight: number;
  private containerHeight: number;
  private items: any[];
  private scrollTop: number = 0;

  constructor(itemHeight: number, containerHeight: number, items: any[] = []) {
    this.itemHeight = itemHeight;
    this.containerHeight = containerHeight;
    this.items = items;
  }

  setScrollTop(scrollTop: number): void {
    this.scrollTop = scrollTop;
  }

  getVisibleRange(): { start: number; end: number } {
    const start = Math.floor(this.scrollTop / this.itemHeight);
    const end = Math.ceil((this.scrollTop + this.containerHeight) / this.itemHeight);

    return {
      start: Math.max(0, start),
      end: Math.min(end, this.items.length),
    };
  }

  getVisibleItems(): any[] {
    const { start, end } = this.getVisibleRange();
    return this.items.slice(start, end);
  }

  getOffsetY(index: number): number {
    return index * this.itemHeight - this.scrollTop;
  }

  updateItems(items: any[]): void {
    this.items = items;
  }
}

/**
 * Batch updates to avoid excessive re-renders
 */
export const BatchUpdater = {
  queue: [] as (() => void)[],
  scheduled: false,

  schedule(callback: () => void): void {
    this.queue.push(callback);

    if (!this.scheduled) {
      this.scheduled = true;

      requestAnimationFrame(() => {
        while (this.queue.length > 0) {
          const callback = this.queue.shift();
          callback?.();
        }
        this.scheduled = false;
      });
    }
  },

  flush(): void {
    while (this.queue.length > 0) {
      const callback = this.queue.shift();
      callback?.();
    }
    this.scheduled = false;
  },
};

/**
 * Resource prefetching
 */
export function prefetchResource(url: string, type: 'prefetch' | 'preload' | 'dns-prefetch' = 'prefetch'): void {
  const link = document.createElement('link');
  link.rel = type;

  if (type === 'preload') {
    link.as = 'script';
  }

  link.href = url;
  document.head.appendChild(link);
}

/**
 * Calculate optimal chunk size for data processing
 */
export function getOptimalChunkSize(dataSize: number, targetDuration: number = 16): number {
  // 16ms ~= 60fps
  const itemsPerMs = dataSize / 1000; // Rough estimate
  return Math.ceil(itemsPerMs * targetDuration);
}

/**
 * Process data in chunks to avoid blocking UI
 */
export async function processInChunks<T, R>(
  data: T[],
  processor: (item: T) => R,
  chunkSize: number = 100
): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);

    // Process chunk
    chunk.forEach((item) => {
      results.push(processor(item));
    });

    // Yield to browser
    if (i + chunkSize < data.length) {
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
    }
  }

  return results;
}
