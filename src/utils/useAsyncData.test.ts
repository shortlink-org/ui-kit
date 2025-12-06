import { renderHook, waitFor } from '@testing-library/react'
import { useAsyncData, clearPromiseCache } from './useAsyncData'

describe('useAsyncData', () => {
  beforeEach(() => {
    clearPromiseCache()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    clearPromiseCache()
  })

  it('creates a promise from fetcher function', async () => {
    const fetcher = jest.fn(() => Promise.resolve({ data: 'test' }))

    const { result } = renderHook(() => useAsyncData('test-key', fetcher))

    expect(fetcher).toHaveBeenCalledTimes(1)
    expect(result.current).toBeInstanceOf(Promise)
  })

  it('caches promises by key', () => {
    const fetcher1 = jest.fn(() => Promise.resolve({ data: 'test1' }))
    const fetcher2 = jest.fn(() => Promise.resolve({ data: 'test2' }))

    const { result: result1 } = renderHook(() =>
      useAsyncData('same-key', fetcher1),
    )
    const { result: result2 } = renderHook(() =>
      useAsyncData('same-key', fetcher2),
    )

    // Second call should use cached promise, so fetcher2 should not be called
    expect(fetcher1).toHaveBeenCalledTimes(1)
    expect(fetcher2).not.toHaveBeenCalled()
    expect(result1.current).toBe(result2.current)
  })

  it('creates new promise for different keys', () => {
    const fetcher = jest.fn(() => Promise.resolve({ data: 'test' }))

    const { result: result1 } = renderHook(() =>
      useAsyncData('key-1', fetcher),
    )
    const { result: result2 } = renderHook(() =>
      useAsyncData('key-2', fetcher),
    )

    expect(fetcher).toHaveBeenCalledTimes(2)
    expect(result1.current).not.toBe(result2.current)
  })

  it('removes failed promises from cache immediately', async () => {
    const failingFetcher = jest.fn(() => Promise.reject(new Error('Failed')))

    const { result } = renderHook(() =>
      useAsyncData('fail-key', failingFetcher),
    )

    try {
      await result.current
    } catch {
      // Expected to fail
    }

    // Wait a bit for cache cleanup
    await waitFor(() => {
      expect(failingFetcher).toHaveBeenCalledTimes(1)
    })

    // Cache should be cleared after rejection, so new call should create new promise
    renderHook(() =>
      useAsyncData('fail-key', failingFetcher),
    )
    
    await waitFor(() => {
      expect(failingFetcher).toHaveBeenCalledTimes(2)
    })
  })

  it('removes successful promises from cache after timeout', async () => {
    const fetcher = jest.fn(() => Promise.resolve({ data: 'test' }))

    const { result } = renderHook(() => useAsyncData('timeout-key', fetcher))

    await result.current

    // Fast forward past 5 second timeout
    jest.advanceTimersByTime(5000)

    // Cache should be cleared, so new call should create new promise
    renderHook(() =>
      useAsyncData('timeout-key', fetcher),
    )

    await waitFor(() => {
      // Should create new promise since cache was cleared
      expect(fetcher).toHaveBeenCalledTimes(2)
    })
  })

  it('clearPromiseCache removes specific key', () => {
    const fetcher = jest.fn(() => Promise.resolve({ data: 'test' }))

    renderHook(() => useAsyncData('key-1', fetcher))
    renderHook(() => useAsyncData('key-2', fetcher))

    // key-1 and key-2 were called once each = 2 times
    expect(fetcher).toHaveBeenCalledTimes(2)

    clearPromiseCache('key-1')

    renderHook(() => useAsyncData('key-1', fetcher))

    // Should create new promise since key-1 was cleared, so total = 3
    expect(fetcher).toHaveBeenCalledTimes(3)
  })

  it('clearPromiseCache clears all keys when no key provided', () => {
    const fetcher = jest.fn(() => Promise.resolve({ data: 'test' }))

    renderHook(() => useAsyncData('key-1', fetcher))
    renderHook(() => useAsyncData('key-2', fetcher))

    clearPromiseCache()

    renderHook(() => useAsyncData('key-1', fetcher))
    renderHook(() => useAsyncData('key-2', fetcher))

    // Should create new promises since cache was cleared
    expect(fetcher).toHaveBeenCalledTimes(4)
  })

  it('handles promise resolution correctly', async () => {
    const testData = { id: 1, name: 'Test' }
    const fetcher = jest.fn(() => Promise.resolve(testData))

    const { result } = renderHook(() => useAsyncData('resolve-key', fetcher))

    const resolvedData = await result.current

    expect(resolvedData).toEqual(testData)
  })

  it('handles promise rejection correctly', async () => {
    const error = new Error('Test error')
    const fetcher = jest.fn(() => Promise.reject(error))

    const { result } = renderHook(() => useAsyncData('reject-key', fetcher))

    await expect(result.current).rejects.toThrow('Test error')
  })
})

