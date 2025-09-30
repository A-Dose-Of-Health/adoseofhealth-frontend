export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  description: string;
  duration?: string; // human-readable
}

/** Helper to convert ISO 8601 duration to hh:mm:ss or mm:ss */
function parseISO8601Duration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  if (!match) return "0:00";

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${minutes}:${pad(seconds)}`;
}

// Define types for YouTube API responses (narrow instead of any)
interface PlaylistItem {
  contentDetails: {
    videoId: string;
    videoPublishedAt: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      maxres?: { url: string };
      high?: { url: string };
      medium?: { url: string };
      default?: { url: string };
    };
  };
}

interface VideoDetail {
  id: string;
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount?: string;
  };
}

/**
 * Fetch ONLY long-form videos (no Shorts) for a channel.
 * Can optionally sort by popularity.
 */
export async function fetchYouTubeVideos(
  channelId: string,
  maxResults = 10,
  sortBy: "recent" | "popular" = "recent"
): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing YOUTUBE_API_KEY in environment variables");
  }

  // Step 1: Fetch long-form uploads playlist
  const playlistId = channelId.replace(/^UC/, "UULF");
  const playlistUrl = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  playlistUrl.searchParams.set("key", apiKey);
  playlistUrl.searchParams.set("playlistId", playlistId);
  playlistUrl.searchParams.set("part", "snippet,contentDetails");
  playlistUrl.searchParams.set("maxResults", maxResults.toString());

  const playlistRes = await fetch(playlistUrl.toString(), { next: { revalidate: 3600 } });
  if (!playlistRes.ok) {
    console.error(await playlistRes.text());
    throw new Error("Failed to fetch YouTube playlist items");
  }

  const playlistData = await playlistRes.json();
  const playlistItems: PlaylistItem[] = playlistData.items || [];

  const videoIds = playlistItems.map((item) => item.contentDetails.videoId);
  if (videoIds.length === 0) return [];

  // Step 2: Fetch contentDetails + statistics (duration + viewCount)
  const videosUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
  videosUrl.searchParams.set("key", apiKey);
  videosUrl.searchParams.set("id", videoIds.join(","));
  videosUrl.searchParams.set("part", "contentDetails,statistics");

  const videosRes = await fetch(videosUrl.toString(), { next: { revalidate: 3600 } });
  if (!videosRes.ok) {
    console.error(await videosRes.text());
    throw new Error("Failed to fetch YouTube video details");
  }

  const videosData = await videosRes.json();
  const videoDetails: VideoDetail[] = videosData.items || [];

  const durationsMap: Record<string, string> = {};
  const viewCountMap: Record<string, number> = {};

  for (const item of videoDetails) {
    durationsMap[item.id] = parseISO8601Duration(item.contentDetails.duration);
    viewCountMap[item.id] = parseInt(item.statistics.viewCount || "0", 10);
  }

  // Step 3: Map final YouTubeVideo array
  const videos = playlistItems.map((item) => {
    const thumb =
      item.snippet.thumbnails.maxres?.url ||
      item.snippet.thumbnails.high?.url ||
      item.snippet.thumbnails.medium?.url ||
      item.snippet.thumbnails.default?.url ||
      "";

    return {
      id: item.contentDetails.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: thumb,
      publishedAt: item.contentDetails.videoPublishedAt,
      duration: durationsMap[item.contentDetails.videoId],
      viewCount: viewCountMap[item.contentDetails.videoId],
    };
  });

  // Step 4: Sort by popularity if requested
  if (sortBy === "popular") {
    videos.sort((a, b) => b.viewCount - a.viewCount);
  }

  // Step 5: Return videos without exposing viewCount
  return videos.map(({ viewCount, ...rest }) => rest);
}
