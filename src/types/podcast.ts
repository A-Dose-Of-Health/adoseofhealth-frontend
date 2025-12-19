export interface PodcastEpisode {
  // Core identifiers
  guid?: string;
  anchorSlug?: string;

  // Episode info
  title?: string;
  description?: string;
  date?: string;
  image?: string;
  audioUrl?: string;

  isNew?: boolean;

  // Links
  spotifyLink?: string | null;
  appleLink?: string | null;
  amazonLink?: string | null;
  youtubeLink?: string | null;

  // IDs
  episodeId?: string;
  spotifyEpId?: string | null;
  audioId?: string | null;

  // Extra Spotify / metadata
  durationMs?: number;        // episode duration in ms
  explicit?: boolean;         // is explicit content
  languages?: string[];       // languages supported
  author?: string;            // episode author
  episodeType?: string;       // full, bonus, trailer, etc.
}
