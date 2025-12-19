import Link from "next/link";
import SingleAudioPodcastCard from "./SingleAudioPodcastCard";
import { PodcastEpisode } from "@/types/podcast";

interface AllAudioPodcastsPageProps {
  episodes: PodcastEpisode[];
}

export default function AllAudioPodcastsPage({ episodes }: AllAudioPodcastsPageProps) {
  if (!episodes || episodes.length === 0) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-8">🎙️ A Dose of Health Podcast</h1>
        <p>No episodes available at the moment. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">🎙️ A Dose of Health Podcast</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {episodes.map((ep) => (
          <Link
            key={ep.guid}
            href={`/media-hub/podcasts/${ep.anchorSlug || ep.guid}`}
            aria-label={`Go to episode ${ep.title}`}
          >
            <SingleAudioPodcastCard episode={ep} />
          </Link>
        ))}
      </div>
    </div>
  );
}
