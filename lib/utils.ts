import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(isoDuration: string) {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  if (!match) return "0:00"

  const hours = match[1] ? parseInt(match[1].replace("H", "")) : 0
  const minutes = match[2] ? parseInt(match[2].replace("M", "")) : 0
  const seconds = match[3] ? parseInt(match[3].replace("S", "")) : 0

  const totalSeconds = (hours * 3600) + (minutes * 60) + seconds

  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }
  return `${m}:${s.toString().padStart(2, "0")}`
}

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
}

// --- Types for YouTube API responses ---

interface YouTubeVideoSnippet {
  title: string
  thumbnails: {
    medium: {
      url: string
    }
  }
  resourceId?: {
    videoId: string
  }
}

interface YouTubeVideoStatistics {
  viewCount: string
}

interface YouTubeVideoContentDetails {
  duration: string
}

interface YouTubeVideoItem {
  id: string
  snippet: YouTubeVideoSnippet
  statistics: YouTubeVideoStatistics
  contentDetails: YouTubeVideoContentDetails
}

interface YouTubeSearchItem {
  id: {
    videoId: string
  }
}

// --- Fetch Functions ---

export async function fetchVideos(
  API_KEY: string,
  CHANNEL_ID: string,
  formatDurationFn: (isoDuration: string) => string
) {
  const searchRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=5&type=video`
  )
  const searchData: { items: YouTubeSearchItem[] } = await searchRes.json()

  const videoIds = searchData.items
    .map((item) => item.id.videoId)
    .join(",")

  const videosRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=contentDetails,statistics,snippet`
  )
  const videosData: { items: YouTubeVideoItem[] } = await videosRes.json()

  const videos = videosData.items.map((video) => ({
    videoId: video.id,
    title: video.snippet.title,
    thumbnail: video.snippet.thumbnails.medium.url,
    views: `${Number(video.statistics.viewCount).toLocaleString()} views`,
    duration: formatDurationFn(video.contentDetails.duration),
  }))

  return videos
}

export async function fetchChannelStats(API_KEY: string, CHANNEL_ID: string) {
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
  )
  const channelData: {
    items: Array<{
      statistics: {
        subscriberCount: string
        viewCount: string
      }
    }>
  } = await channelRes.json()

  const stats = channelData.items[0].statistics

  return {
    subscriberCount: Number(stats.subscriberCount),
    viewCount: Number(stats.viewCount),
  }
}

export async function fetchPopularVideos(
  API_KEY: string,
  channelId: string,
  maxResults = 5,
  formatDurationFn: (isoDuration: string) => string
) {
  try {
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&id=${channelId}&part=contentDetails`
    )
    const channelData: {
      items: Array<{
        contentDetails: {
          relatedPlaylists: {
            uploads: string
          }
        }
      }>
    } = await channelRes.json()

    if (!channelData.items || channelData.items.length === 0) {
      throw new Error("Channel not found")
    }

    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads

    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${uploadsPlaylistId}&part=snippet&maxResults=${maxResults}`
    )
    const playlistData: {
      items: Array<{
        snippet: YouTubeVideoSnippet & { resourceId: { videoId: string } }
      }>
    } = await playlistRes.json()

    if (!playlistData.items || playlistData.items.length === 0) {
      throw new Error("No videos found in channel")
    }

    const videoIds = playlistData.items
      .map((item) => item.snippet.resourceId.videoId)
      .join(",")

    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,contentDetails,statistics`
    )
    const videosData: { items: YouTubeVideoItem[] } = await videosRes.json()

    const sortedVideos = videosData.items.sort((a, b) => {
      return (
        parseInt(b.statistics.viewCount) - parseInt(a.statistics.viewCount)
      )
    })

    const videos = sortedVideos.map((video) => ({
      videoId: video.id,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.medium.url,
      views: `${Number(video.statistics.viewCount).toLocaleString()} views`,
      duration: formatDurationFn(video.contentDetails.duration),
    }))

    return videos.slice(0, maxResults)
  } catch (error) {
    console.error("Error fetching popular videos:", error)
    throw error
  }
}
