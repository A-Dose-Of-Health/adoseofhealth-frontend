import PodcastPlayer from "@/components/PodcastPlayer";
import { fetchAudioPodcasts } from "@/lib/fetchAudioPodcasts";

export const revalidate = 3600;

interface EpisodePageProps {
  params: {
    slug: string;
  };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const episodes = await fetchAudioPodcasts();
  const episode = episodes.find(
    (ep) => ep.anchorSlug === params.slug || ep.guid === params.slug
  );

  if (!episode) {
    return <p className="text-center py-10">Episode not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold">{episode.title}</h1>

      {/* Date */}
      <p className="text-gray-500">
        {episode.date
          ? new Date(episode.date).toLocaleDateString()
          : "Date unknown"}
      </p>

      {/* Author */}
      {episode.author && (
        <p className="text-gray-400 italic">By {episode.author}</p>
      )}

      {/* Episode Image */}
      {episode.image && (
        <img
          src={episode.image}
          alt={episode.title}
          className="w-full h-64 object-cover rounded-lg"
        />
      )}

      {/* Description */}
      {episode.description && (
        <div className="text-gray-700">{episode.description}</div>
      )}

      {/* Additional Metadata */}
      <div className="flex flex-wrap gap-4 text-gray-600 mt-2">
        {episode.durationMs && (
          <span>
            Duration: {Math.floor(episode.durationMs / 60000)} min
          </span>
        )}
        {episode.explicit !== undefined && (
          <span>{episode.explicit ? "Explicit Content" : "Clean"}</span>
        )}
        {episode.episodeType && <span>Type: {episode.episodeType}</span>}
        {episode.languages && episode.languages.length > 0 && (
          <span>Languages: {episode.languages.join(", ")}</span>
        )}
      </div>

      {/* Podcast Player */}
      <PodcastPlayer episodes={[episode]} />

      {/* External Links */}
      <div className="flex flex-wrap gap-4 mt-4">
        {episode.spotifyLink && (
          <a
            href={episode.spotifyLink}
            target="_blank"
            className="text-green-600 hover:underline"
          >
            Spotify
          </a>
        )}
        {episode.appleLink && (
          <a
            href={episode.appleLink}
            target="_blank"
            className="text-gray-800 hover:underline"
          >
            Apple
          </a>
        )}
        {episode.amazonLink && (
          <a
            href={episode.amazonLink}
            target="_blank"
            className="text-yellow-600 hover:underline"
          >
            Amazon
          </a>
        )}
        {episode.youtubeLink && (
          <a
            href={episode.youtubeLink}
            target="_blank"
            className="text-red-600 hover:underline"
          >
            YouTube
          </a>
        )}
      </div>
    </div>
  );
}
