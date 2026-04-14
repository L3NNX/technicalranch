import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── Duration: ISO 8601 → human readable ──────────────────────────────────────

export function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  if (!match) return "0:00"

  const hours   = match[1] ? parseInt(match[1]) : 0
  const minutes = match[2] ? parseInt(match[2]) : 0
  const seconds = match[3] ? parseInt(match[3]) : 0

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  }
  return `${minutes}:${String(seconds).padStart(2, "0")}`
}

// ── View count: number → compact string (e.g. 1.2K, 3.4M) ───────────────────

export function formatViews(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M views`
  if (count >= 1_000)     return `${(count / 1_000).toFixed(1)}K views`
  return `${count} views`
}

// ── Animated counter (legacy, kept for compatibility) ─────────────────────────

export function animateCounter(
  target: number,
  setter: (value: number) => void,
  duration = 2000
) {
  let start = 0
  const increment = target / (duration / 16)
  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      setter(target)
      clearInterval(timer)
    } else {
      setter(Math.floor(start))
    }
  }, 16)
  return timer
}

// ── Best available thumbnail URL ──────────────────────────────────────────────
// YouTube thumbnail quality ladder (best → fallback):
// maxresdefault (1280x720) → sddefault (640x480) → hqdefault (480x360) → mqdefault (320x180)
// We'll use hqdefault as default since maxresdefault isn't always available for older videos.

export function getThumbnailUrl(videoId: string, quality: "max" | "hq" | "mq" = "hq"): string {
  const map = {
    max: "maxresdefault",
    hq:  "hqdefault",
    mq:  "mqdefault",
  }
  return `https://img.youtube.com/vi/${videoId}/${map[quality]}.jpg`
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface YouTubeVideoSnippet {
  title: string
  thumbnails: {
    medium:  { url: string }
    high?:   { url: string }
    maxres?: { url: string }
  }
  resourceId?: { videoId: string }
}

interface YouTubeVideoStatistics {
  viewCount: string
  likeCount?: string
}

interface YouTubeVideoContentDetails {
  duration: string
}

interface YouTubeVideoItem {
  id: string
  snippet:        YouTubeVideoSnippet
  statistics:     YouTubeVideoStatistics
  contentDetails: YouTubeVideoContentDetails
}

interface YouTubeSearchItem {
  id: { videoId: string }
}

export interface VideoData {
  videoId:   string
  title:     string
  thumbnail: string
  views:     string       // formatted string e.g. "12.3K views"
  viewCount: number       // raw number for sorting/stats
  duration:  string
}

// ── Fetch latest videos ───────────────────────────────────────────────────────

export async function fetchVideos(
  API_KEY:          string,
  CHANNEL_ID:       string,
  formatDurationFn: (iso: string) => string,
  maxResults        = 10            // ← increased from 5
): Promise<VideoData[]> {
  const searchRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`
  )

  if (!searchRes.ok) throw new Error(`YouTube search API error: ${searchRes.status}`)

  const searchData: { items: YouTubeSearchItem[] } = await searchRes.json()

  if (!searchData.items?.length) return []

  const videoIds = searchData.items.map((i) => i.id.videoId).join(",")

  const videosRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=contentDetails,statistics,snippet`
  )

  if (!videosRes.ok) throw new Error(`YouTube videos API error: ${videosRes.status}`)

  const videosData: { items: YouTubeVideoItem[] } = await videosRes.json()

  return videosData.items.map((video) => {
    const rawViews = Number(video.statistics.viewCount)
    return {
      videoId:   video.id,
      title:     video.snippet.title,
      // Use hqdefault — always available, good enough for cards
      thumbnail: getThumbnailUrl(video.id, "hq"),
      views:     formatViews(rawViews),
      viewCount: rawViews,
      duration:  formatDurationFn(video.contentDetails.duration),
    }
  })
}

// ── Fetch channel stats ───────────────────────────────────────────────────────

export async function fetchChannelStats(API_KEY: string, CHANNEL_ID: string) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
  )

  if (!res.ok) throw new Error(`YouTube channel API error: ${res.status}`)

  const data: {
    items: Array<{
      statistics: {
        subscriberCount: string
        viewCount:       string
        videoCount:      string
      }
    }>
  } = await res.json()

  if (!data.items?.length) throw new Error("Channel not found")

  const s = data.items[0].statistics

  return {
    subscriberCount: Number(s.subscriberCount),
    viewCount:       Number(s.viewCount),
    videoCount:      Number(s.videoCount),   // ← now also returns real video count from API
  }
}

// ── Fetch popular videos (sorted by view count) ───────────────────────────────

export async function fetchPopularVideos(
  API_KEY:          string,
  channelId:        string,
  formatDurationFn: (iso: string) => string,
  maxResults        = 10
): Promise<VideoData[]> {
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&id=${channelId}&part=contentDetails`
  )

  if (!channelRes.ok) throw new Error(`YouTube channel API error: ${channelRes.status}`)

  const channelData: {
    items: Array<{ contentDetails: { relatedPlaylists: { uploads: string } } }>
  } = await channelRes.json()

  if (!channelData.items?.length) throw new Error("Channel not found")

  const uploadsId = channelData.items[0].contentDetails.relatedPlaylists.uploads

  const playlistRes = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${uploadsId}&part=snippet&maxResults=${maxResults}`
  )

  if (!playlistRes.ok) throw new Error(`YouTube playlist API error: ${playlistRes.status}`)

  const playlistData: {
    items: Array<{ snippet: { resourceId: { videoId: string } } }>
  } = await playlistRes.json()

  if (!playlistData.items?.length) return []

  const videoIds = playlistData.items.map((i) => i.snippet.resourceId.videoId).join(",")

  const videosRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,contentDetails,statistics`
  )

  if (!videosRes.ok) throw new Error(`YouTube videos API error: ${videosRes.status}`)

  const videosData: { items: YouTubeVideoItem[] } = await videosRes.json()

  return videosData.items
    .sort((a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount))
    .slice(0, maxResults)
    .map((video) => {
      const rawViews = Number(video.statistics.viewCount)
      return {
        videoId:   video.id,
        title:     video.snippet.title,
        thumbnail: getThumbnailUrl(video.id, "hq"),
        views:     formatViews(rawViews),
        viewCount: rawViews,
        duration:  formatDurationFn(video.contentDetails.duration),
      }
    })
}