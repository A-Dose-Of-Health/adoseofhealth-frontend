import EpisodePage from "@/components/[slug]/SingleAudioPodcastPage";

export const revalidate = 3600; // ISR, refresh hourly

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SingleEpisodePage({ params }: PageProps) {
  const { slug } = await params;

  return <EpisodePage params={{ slug }} />;
}
