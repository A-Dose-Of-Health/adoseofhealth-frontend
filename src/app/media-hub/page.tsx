import AllAudioPodcastsPage from "@/components/AllAudioPodcastsPage";
import { LatestYoutubeVideos } from "@/components/LatestYoutubeVideos";
import { MediaHubHeroSection } from "@/components/MediaHubHeroSection";
import { MediaHubHeroSection1 } from "@/components/MediaHubHeroSection1";
import RecentPodcastsOverview from "@/components/RecentPodcastsOverview";
import { fetchAudioPodcasts } from "@/lib/fetchAudioPodcasts";
import { fetchYouTubeVideos } from "@/lib/fetchYoutube";
import { PodcastEpisode } from "@/types/podcast";

import Link from "next/link";

export const revalidate = 3600; // ISR, refresh hourly

export default async function MediaHubPage() {
  const channelId = "UC84QO01Prami9FvG1dnbphA"; // example: Google Developers channel
  const videos = await fetchYouTubeVideos(channelId, 3, "recent");

  const episodes = await fetchAudioPodcasts();

  const recentEpisodes = episodes.slice(0, 4);

  const earliestEpisode = [...episodes]
  .sort(
    (a, b) =>
      new Date(a.date ?? Infinity).getTime() -
      new Date(b.date ?? Infinity).getTime()
  )[0];

  if (episodes.length === 0) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-8">🎙️ A Dose of Health Podcast</h1>
        <p>No episodes available at the moment. Please check back later.</p>
      </div>
    );
  }
  return (
    <>
      <MediaHubHeroSection1 />
      <LatestYoutubeVideos videos={videos} />
      <RecentPodcastsOverview episodes={recentEpisodes} earliestEpisode={earliestEpisode}/>
    </>
  );
}
