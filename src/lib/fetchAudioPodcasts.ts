import Parser from "rss-parser";
import { PodcastEpisode } from "@/types/podcast";

interface RSSItem {
  title: string;
  link?: string;
  contentSnippet?: string;
  pubDate?: string;
  enclosure?: { url?: string };
  guid?: string;
  itunes?: {
    image?: string;
    author?: string;
    duration?: string;
    episodeType?: string;
  };
}

const parser = new Parser<RSSItem>();

// Extract IDs from URLs
function extractSpotifyEpisodeId(link?: string): string | null {
  const match = link?.match(/-(e[\w\d]+)$/);
  return match ? match[1] : null;
}

function extractAnchorEpisodeSlug(link?: string): string | null {
  const match = link?.match(/\/episodes\/([^\/]+)-e[\w\d]+/);
  return match ? match[1] : null;
}

function extractAnchorAudioId(enclosureUrl?: string): string | null {
  const match = enclosureUrl?.match(/\/play\/(\d+)\//);
  return match ? match[1] : null;
}

function isNewEpisode(pubDate?: string): boolean {
  if (!pubDate) return false;
  const now = new Date();
  const published = new Date(pubDate);
  const diff = (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);
  return diff <= 7;
}

// Convert HH:MM:SS or MM:SS to milliseconds
function parseDuration(duration?: string): number | undefined {
  if (!duration) return undefined;
  const parts = duration.split(":").map(Number).reverse();
  let ms = 0;
  if (parts[0]) ms += parts[0] * 1000;       // seconds
  if (parts[1]) ms += parts[1] * 60_000;     // minutes
  if (parts[2]) ms += parts[2] * 3_600_000;  // hours
  return ms;
}

// Spotify API fetch
async function fetchSpotifyEpisode(spotifyId: string) {
  const token = process.env.SPOTIFY_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch(`https://api.spotify.com/v1/episodes/${spotifyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// Caching
let cached: PodcastEpisode[] | null = null;
let lastFetch = 0;

export async function fetchAudioPodcasts(): Promise<PodcastEpisode[]> {
  if (Date.now() - lastFetch < 60_000 && cached) return cached;

  const feed = await parser.parseURL("https://anchor.fm/s/ffe9b68c/podcast/rss");

  const items: PodcastEpisode[] = await Promise.all(
    feed.items.map(async (item) => {
      const spotifyEpId = extractSpotifyEpisodeId(item.link) ?? undefined;
      const anchorSlug = extractAnchorEpisodeSlug(item.link) ?? undefined;
      const audioId = extractAnchorAudioId(item.enclosure?.url) ?? undefined;

      // Fetch Spotify data if ID exists
      const spotifyData = spotifyEpId ? await fetchSpotifyEpisode(spotifyEpId) : {};

      // Duration: RSS first, fallback Spotify
      const durationMs =
        parseDuration(item.itunes?.duration) || spotifyData?.duration_ms;

      return {
        // Core fields
        title: item.title ?? undefined,
        description: item.contentSnippet ?? undefined,
        date: item.pubDate ?? undefined,
        isNew: isNewEpisode(item.pubDate),
        audioUrl: item.enclosure?.url ?? undefined,
        image: item.itunes?.image || feed.image?.url || undefined,

        // Links
        spotifyLink: spotifyEpId ? `https://open.spotify.com/episode/${spotifyEpId}` : null,
        appleLink: spotifyEpId
          ? `https://podcasts.apple.com/podcast/id1796565873?i=${spotifyEpId}`
          : `https://podcasts.apple.com/podcast/id1796565873`,
        amazonLink: spotifyEpId
          ? `https://music.amazon.com/podcasts/A-DOSE-OF-HEALTH-ID/episodes/${spotifyEpId}`
          : null,
        youtubeLink: anchorSlug
          ? `https://www.youtube.com/results?search_query=${encodeURIComponent(anchorSlug)}`
          : "https://www.youtube.com/@ADoseOfHealth",

        // IDs
        episodeId: spotifyEpId || audioId || undefined,
        anchorSlug,
        spotifyEpId,
        audioId,
        guid: item.guid ?? undefined,

        // Extra metadata
        durationMs,
        explicit: spotifyData?.explicit,
        languages: spotifyData?.languages,
        author: item.itunes?.author || spotifyData?.show?.publisher || undefined,
        episodeType: item.itunes?.episodeType || spotifyData?.episode_type || undefined,
      };
    })
  );

  cached = items;
  lastFetch = Date.now();
  return items;
}
