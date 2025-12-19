import { fetchAudioPodcasts } from "@/lib/fetchAudioPodcasts";
import AllAudioPodcastsPage from "@/components/AllAudioPodcastsPage";
import { PodcastEpisode } from "@/types/podcast";

export const revalidate = 3600; // ISR: refresh hourly

export default async function PodcastsPage() {
    const episodes = await fetchAudioPodcasts();


  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">All Podcast Episodes</h1>
      <AllAudioPodcastsPage episodes={episodes} />
    </main>
  );
}
