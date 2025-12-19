import EpisodePage from "@/components/[slug]/SingleAudioPodcastPage";

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 3600; // ISR, refresh hourly

export default function SingleEpisodePage({ params }: Props) {
  return <EpisodePage params={params} />;
}