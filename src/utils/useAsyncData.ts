import { useMemo } from 'react'

/**
 * Cache for promises to prevent duplicate requests
 */
const promiseCache = new Map<string, Promise<unknown>>()

// Helper to cast cached promise to correct type
function getCachedPromise<T>(key: string): Promise<T> | undefined {
  const cached = promiseCache.get(key)
  return cached as Promise<T> | undefined
}

/**
 * Creates a cached promise for data fetching.
 * Useful with React 19's use() hook and Suspense.
 * 
 * @param key - Unique cache key (should change when you want to refetch)
 * @param fetcher - Function that returns a promise. Should be stable (use useCallback if needed)
 * @returns The promise (can be used with use() hook)
 * 
 * @example
 * ```tsx
 * function UserProfile({ userId }: { userId: string }) {
 *   const userPromise = useAsyncData(
 *     `user-${userId}`,
 *     useCallback(() => fetchUser(userId), [userId])
 *   )
 *   const user = use(userPromise)
 *   
 *   return <div>{user.name}</div>
 * }
 * ```
 */
export function useAsyncData<T>(
  key: string,
  fetcher: () => Promise<T>,
): Promise<T> {
  return useMemo(() => {
    // Return cached promise if it exists
    const cached = getCachedPromise<T>(key)
    if (cached) {
      return cached
    }

    // Create new promise and cache it
    const promise = fetcher()
    promiseCache.set(key, promise)

    // Remove from cache when promise resolves/rejects
    promise
      .then(() => {
        // Keep in cache for a bit, or remove immediately
        // You can adjust this based on your needs
        setTimeout(() => promiseCache.delete(key), 5000)
      })
      .catch(() => {
        // Remove failed promises immediately
        promiseCache.delete(key)
      })

    return promise
    // Note: fetcher is in deps, but cache lookup by key prevents unnecessary recreations
  }, [key, fetcher])
}

/**
 * Clears the promise cache. Useful for manual cache invalidation.
 */
export function clearPromiseCache(key?: string) {
  if (key) {
    promiseCache.delete(key)
  } else {
    promiseCache.clear()
  }
}

