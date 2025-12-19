import HeroSectionTextHover from "@/components/animata/hero/hero-section-text-hover";
import { ContactUs } from "@/components/contactus";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { LatestPodcastsFeed } from "@/components/LatestPodcastsFeed";
import { Navbar } from "@/components/navbar";
import { Navbar2 } from "@/components/navbar2";
import { Navbar3 } from "@/components/navbar3";
import { TheEssentials } from "@/components/the-essentials";
import { YoutubeFeed } from "@/components/YoutubeFeed";
import { fetchLancetFeed } from "@/lib/fetchRss";
import { fetchYouTubeVideos } from "@/lib/fetchYoutube";
import { fetchYouTubeRss } from "@/lib/fetchYoutubeRss";

export const revalidate = 3600; // ⏳ dynamic refresh every 1hr

import Image from "next/image";

export default async function Home() {
  const articles = await fetchLancetFeed();

  const channelId = "UC84QO01Prami9FvG1dnbphA"; // example: Google Developers channel
  const videos = await fetchYouTubeVideos(channelId, 6, 'recent');

  return (
    <>
          {/* <HeroSectionTextHover />

          <Navbar2/> */}

      <ContentWrapper>
        <Hero />

        {/* RSS Feed Section */}
        {/* <section className="my-16">
          <h2 className="text-2xl font-bold mb-6">Latest from The Lancet</h2>
          <ul className="space-y-6">
            {articles.map((article, idx) => (
              <li key={idx} className="flex gap-4 border-b pb-4">
                {article.imageUrl && (
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    width={120}
                    height={80}
                    className="rounded-md object-cover"
                    unoptimized
                  />
                )}
                <div>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-lg font-semibold"
                  >
                    {article.title}
                  </a>
                  <p className="text-sm text-gray">{article.pubDate}</p>
                  <p className="text-gray-700">{article.contentSnippet}</p>
                </div>
              </li>
            ))}
          </ul>
        </section> */}

         {/* <YoutubeFeed videos={videos} title="Fresh from the Channel" /> */}
         <LatestPodcastsFeed videos={videos}/>
        <ContactUs/>
      </ContentWrapper>

      {/* <Navbar /> */}
      {/* <TheEssentials /> */}

      
    </>
  );
}
