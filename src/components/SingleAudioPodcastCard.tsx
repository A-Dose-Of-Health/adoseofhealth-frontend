import type { PodcastEpisode } from "@/types/podcast";

type Props = {
  episode: PodcastEpisode;
};

export default function SingleAudioPodcastCard({ episode }: Props) {
  return (
    <div className="p-4 rounded-xl border hover:shadow-lg cursor-pointer transition">
      {episode.image && (
        <img
          src={episode.image}
          alt={episode.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}

      <h2 className="text-lg font-semibold">{episode.title}</h2>

      <p className="text-gray-500 text-sm mb-2">
        {episode.date
          ? new Date(episode.date).toLocaleDateString()
          : "Unknown date"}
      </p>

      <p className="text-gray-700 text-sm line-clamp-3">
        {episode.description}
      </p>

      {episode.isNew && (
        <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
          New
        </span>
      )}
    </div>
  );
}
