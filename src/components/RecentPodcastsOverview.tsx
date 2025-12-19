"use client";

import Link from "next/link";
import PodcastPlayer from "@/components/PodcastPlayer";
import { PodcastEpisode } from "@/types/podcast";
import FrostedTabs from "./FrostedTabs";

interface Props {
  episodes: PodcastEpisode[];
  earliestEpisode: PodcastEpisode;
}

export default function RecentPodcastsOverview({ episodes, earliestEpisode }: Props) {
  // Sort episodes by date descending and pick the 3 most recent
  const recentEpisodes = episodes
    .sort(
      (a, b) =>
        new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
    )
    .slice(0, 3);

    


  const cardsColumn1 = [
    { id: 1, title: "Card 1", description: "Description 1" },
    { id: 2, title: "Card 2", description: "Description 2" },
    { id: 3, title: "Card 3", description: "Description 3" },
  ];

  const column2Card = {
    id: 4,
    title: "Column 2 Card",
    description: "This card spans the full height of column 1",
  };

  return (
    <section className="py-12 bg-gray-50">
      {/* <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8 max-w-[86%] mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Recent Podcasts</h2>
          <Link
            href="/media-hub/podcasts"
            className="inline-flex items-center gap-2 text-xl font-medium text-primary hover:underline"
          >
            View All Episodes →
          </Link>
        </div>

        <div className="relative mx-auto grid w-full max-w-[86%] gap-5 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:gap-y-20 ">
          {recentEpisodes.map((episode) => (
            <div
              key={episode.guid}
              className="bg-white shadow rounded-lg overflow-hidden flex flex-col"
            >
              {episode.image && (
                <img
                  src={episode.image}
                  alt={episode.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4 flex flex-col flex-grow">
                <Link
                  href={`/media-hub/podcasts/${episode.anchorSlug}`}
                  className="text-lg font-semibold text-gray-900 hover:text-primary mb-2"
                >
                  {episode.title}
                </Link>

                <div className="flex items-center text-gray-500 text-xl mb-2">
                  {episode.date && (
                    <span>{new Date(episode.date).toLocaleDateString()}</span>
                  )}
                  {episode.isNew && (
                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                      New
                    </span>
                  )}
                </div>

                {episode.description && (
                  <p className="text-gray-700 text-xl mb-4 line-clamp-3">
                    {episode.description}
                  </p>
                )}

                {episode.audioUrl && <PodcastPlayer episodes={[episode]} />}
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <div className="relative overflow-hidden p-4 mx-auto ">
        <div className="h-full w-full py-12 ">
          <div className="flex justify-between items-center mb-8 max-w-[80%] mx-auto">
            <h2 className="text-3xl text-primary">Recent Episodes</h2>
            <Link
              href="/media-hub/podcasts"
              className="inline-flex items-center gap-2 text-xl font-medium text-primary hover:underline"
            >
              View All Episodes →
            </Link>
          </div>
          <div className="relative container mx-auto flex w-full flex-col items-center lg:flex-row ">
            <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full lg:max-w-[1320px]">
              {/* Column 2 card first on mobile */}
              <div
                className="
    group relative
    flex flex-col gap-4
    rounded-2xl bg-gray-light/80 p-3
    transition duration-300
    sm:flex-row sm:p-4
    xl:gap-6 xl:rounded-4xl xl:p-6
    dark:bg-transparent
    dark:bg-gradient-to-r dark:from-blue-light/15 dark:to-white/15
    dark:backdrop-blur-xs
  "
              >
                {/* Hover border frame */}
                <span
                  className="
       absolute inset-0 z-30
      rounded-2xl xl:rounded-4xl
      border border-black/80
      
    "
                />

                {/* Thumbnail (background layer — clipped here, NOT on parent) */}
                <div className="absolute inset-0 z-0 rounded-2xl xl:rounded-4xl overflow-hidden">
                  {/* <img
                    src="/images/podcast-img4.jpg"
                    alt="Podcast"
                    className="h-full w-full object-cover"
                  /> */}

                  {earliestEpisode.image && (
                        <img
                          src={earliestEpisode.image}
                          alt={earliestEpisode.title}
                          className="h-full w-full object-cover"
                        />
                      )}

                  {/* Readability overlay */}
                  <div className="absolute inset-0 bg-transparent
    bg-gradient-to-r from-blue-light/30 to-white/20
     " />
                </div>

                {/* Foreground content */}
                <div
                  className="
      relative z-20
      flex flex-col justify-between gap-4
      p-4 sm:p-6 xl:p-8
      text-white
    "
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span className="flex items-center gap-1">🎥 Video</span>
                      <span className="size-1 rounded-full bg-white/70" />
                      <span>Episode 09</span>
                    </div>

                    <span className="flex items-center gap-1">
                            ⏱ 45 min
                          </span>
                  </div>

                  {/* Main content */}
                  <div className="space-y-3 max-w-[75%]">
                    
                    <Link
                  href={`/media-hub/podcasts/${earliestEpisode.anchorSlug}`}
                  className="block text-xl font-semibold leading-tight
          transition hover:opacity-80
          xl:text-2xl"
                >
                  {earliestEpisode.title}
                </Link>

                    <p className="text-white/90 line-clamp-3">
                      {earliestEpisode.description}
                    </p>
                  </div>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between">
                    <div
                      className="
          inline-flex items-center gap-2
          rounded-full bg-white/80 px-3 py-1.5
          text-sm font-semibold text-black
          backdrop-blur-md
        "
                    >
                      🎙 By Dr. Hope Simiyu
                    </div>

                    <button
                      className="
          grid size-12 place-content-center
          rounded-full bg-secondary text-white
          transition hover:scale-105
        "
                    >
                      ▶
                    </button>
                  </div>
                </div>
              </div>

              {/* Column 1 cards */}
              <div className="order-2 md:order-1 flex flex-col gap-6 group">
                {recentEpisodes.map((episode) => (
                  <div
                    key={episode.guid}
                    className="
    group relative flex flex-col gap-4
    rounded-2xl bg-gray-light/80 p-3
    transition duration-300
    sm:flex-row sm:p-4
    xl:gap-6 xl:rounded-4xl xl:p-6
    dark:bg-transparent
    dark:bg-gradient-to-r dark:from-blue-light/15 dark:to-white/15
    dark:backdrop-blur-xs
  "
                  >
                    {/* Hover border frame */}
                    <span
                      className="
      pointer-events-none absolute inset-0
      rounded-2xl border border-black/80
      transition-all duration-300
      group-hover:-bottom-2 group-hover:border-b-8
      xl:rounded-4xl
    "
                    />

                    {/* Thumbnail */}
                    <div
                      className="
      relative z-10 h-60 shrink-0 overflow-hidden
      rounded-2xl
      sm:h-auto sm:w-44
      xl:w-52 xl:rounded-3xl
    "
                    >
                      <a
                        href="/host/episode-details"
                        className="absolute inset-0 z-10 hover:bg-white/10 transition"
                      />

                      {episode.image && (
                        <img
                          src={episode.image}
                          alt={episode.title}
                          className="w-full object-bottom absolute z-10"
                        />
                      )}

                      {/* Host badge */}
                      <div
                        className="
        absolute bottom-0 mx-auto
        inline-flex w-full items-center gap-2
        rounded-b-2xl border-b-2 border-black
        bg-primary px-3 py-2
        text-sm font-semibold text-black
        backdrop-blur-md h-full
       
      "
                      ></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-1 justify-between gap-4 xl:gap-8">
                      <div className="space-y-3 xl:space-y-4">
                        {/* Meta */}
                        <div className="flex items-center gap-2 text-sm font-medium text-secondary dark:text-tertiary">
                          <span className="flex items-center gap-1">
                            🎥 Video
                          </span>
                          <span className="size-1 rounded-full bg-secondary dark:bg-tertiary" />
                          <span>Episode 09</span>
                        </div>

                        {/* Title */}
                        <Link
                  href={`/media-hub/podcasts/${episode.anchorSlug}`}
                  className="line-clamp-1 text-xl font-semibold leading-tight
          transition hover:opacity-80
          xl:text-2xl"
                >
                  {episode.title}
                </Link>

                        {/* Description */}
                        <p className="text-gray line-clamp-3">
                          {episode.description}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center gap-2 text-sm font-medium text-gray">
                          <span className="flex items-center gap-1">
                            ⏱ 45 min
                          </span>
                          <span className="size-1 rounded-full bg-gray " />
                          <span>May 14</span>
                        </div>
                      </div>

                      {/* Play */}
                      <button
                        className="
        mt-1 grid size-10 shrink-0 place-content-center
        rounded-full bg-secondary text-white
        transition hover:opacity-80
        
      "
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
