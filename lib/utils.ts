import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useEffect, useRef, useCallback } from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Debounce utility
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return useCallback(
    ((...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    }) as T,
    [callback, delay]
  )
}

// Throttle utility
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  limit: number
): T {
  const inThrottle = useRef(false)
  
  return useCallback(
    ((...args) => {
      if (!inThrottle.current) {
        callback(...args)
        inThrottle.current = true
        setTimeout(() => {
          inThrottle.current = false
        }, limit)
      }
    }) as T,
    [callback, limit]
  )
}

// Enhanced formatDuration with memoization
const durationCache = new Map<string, string>()
export function formatDuration(isoDuration: string) {
  if (durationCache.has(isoDuration)) {
    return durationCache.get(isoDuration)!
  }

  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  if (!match) return "0:00"

  const hours = match[1] ? parseInt(match[1].replace("H", "")) : 0
  const minutes = match[2] ? parseInt(match[2].replace("M", "")) : 0
  const seconds = match[3] ? parseInt(match[3].replace("S", "")) : 0

  const totalSeconds = (hours * 3600) + (minutes * 60) + seconds

  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60

  const result = h > 0
    ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    : `${m}:${s.toString().padStart(2, "0")}`

  durationCache.set(isoDuration, result)
  return result
}

// Optimized counter animation
export function animateCounter(
  target: number,
  setter: (value: number) => void,
  duration = 2000
) {
  let start = performance.now()
  const initialValue = 0
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - start
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing function for smoother animation
    const easeOutCubic = 1 - Math.pow(1 - progress, 3)
    const current = Math.floor(initialValue + (target - initialValue) * easeOutCubic)
    
    setter(current)
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  
  requestAnimationFrame(animate)
}

// Batch API requests
export async function batchRequests<T>(
  requests: Promise<T>[],
  batchSize = 3
): Promise<T[]> {
  const results: T[] = []
  
  for (let i = 0; i < requests.length; i += batchSize) {
    const batch = requests.slice(i, i + batchSize)
    const batchResults = await Promise.all(batch)
    results.push(...batchResults)
  }
  
  return results
}

// Retry mechanism for API calls
export async function fetchWithRetry<T>(
  fetcher: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    return await fetcher()
  } catch (error) {
    if (retries === 0) throw error
    
    await new Promise(resolve => setTimeout(resolve, delay))
    return fetchWithRetry(fetcher, retries - 1, delay * 2)
  }
}

// Enhanced YouTube API functions with caching and retry mechanism
const videoCache = new Map()
const statsCache = new Map()

export async function fetchVideos(
  API_KEY: string,
  CHANNEL_ID: string,
  formatDurationFn: (isoDuration: string) => string,
  page = 1,
  pageSize = 5
) {
  const cacheKey = `${CHANNEL_ID}-${page}-${pageSize}`
  if (videoCache.has(cacheKey)) {
    return videoCache.get(cacheKey)
  }

  const fetchVideoData = async () => {
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${pageSize}&pageToken=${page > 1 ? `&pageToken=${page}` : ''}&type=video`
    )
    
    if (!searchRes.ok) {
      throw new Error(`Failed to fetch videos: ${searchRes.statusText}`)
    }
    
    const searchData = await searchRes.json()
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(",")

    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=contentDetails,statistics,snippet`
    )
    
    if (!videosRes.ok) {
      throw new Error(`Failed to fetch video details: ${videosRes.statusText}`)
    }
    
    const videosData = await videosRes.json()

    const videos = videosData.items.map((video: any) => ({
      videoId: video.id,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.medium.url,
      views: `${Number(video.statistics.viewCount).toLocaleString()} views`,
      duration: formatDurationFn(video.contentDetails.duration),
    }))

    return {
      videos,
      nextPageToken: searchData.nextPageToken,
      totalResults: searchData.pageInfo.totalResults,
    }
  }

  const result = await fetchWithRetry(fetchVideoData)
  videoCache.set(cacheKey, result)
  
  // Cache invalidation after 5 minutes
  setTimeout(() => videoCache.delete(cacheKey), 5 * 60 * 1000)
  
  return result
}

export async function fetchChannelStats(API_KEY: string, CHANNEL_ID: string) {
  const cacheKey = CHANNEL_ID
  if (statsCache.has(cacheKey)) {
    return statsCache.get(cacheKey)
  }

  const fetchStats = async () => {
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
    )
    
    if (!channelRes.ok) {
      throw new Error(`Failed to fetch channel stats: ${channelRes.statusText}`)
    }
    
    const channelData = await channelRes.json()
    const stats = channelData.items[0].statistics

    return {
      subscriberCount: Number(stats.subscriberCount),
      viewCount: Number(stats.viewCount),
    }
  }

  const result = await fetchWithRetry(fetchStats)
  statsCache.set(cacheKey, result)
  
  // Cache invalidation after 5 minutes
  setTimeout(() => statsCache.delete(cacheKey), 5 * 60 * 1000)
  
  return result
}

// Intersection Observer hook with options
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [ref, inView] = useInView({
    threshold: options.threshold || 0,
    root: options.root || null,
    rootMargin: options.rootMargin || "0px",
    triggerOnce: true,
  })

  return { ref, inView }
}