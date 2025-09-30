"use client";

import {
  Play,
  Mic,
  Share,
  DiscAlbum,
  EllipsisVertical,
  Clock,
  Video,
  Plus,
} from "lucide-react";
import { useState } from "react";

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration?: string;
}

interface Podcast extends YouTubeVideo {
  host?: string;
  type?: string;
  episode?: string;
  date?: string;
}

function PodcastCard({ podcast }: { podcast: Podcast }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPlaybar, setShowPlaybar] = useState(false);

  return (
    <div className="group bg-gray-light relative rounded-2xl p-3 duration-300 sm:p-4 lg:rounded-3xl xl:rounded-4xl xl:p-6">
      <span className="absolute inset-0 rounded-2xl border border-black duration-300 group-hover:-bottom-2 group-hover:border-b-8 lg:rounded-3xl xl:rounded-4xl"></span>

      {/* Podcast image */}
      <div className="relative z-[1] mb-4 h-60 overflow-hidden rounded-2xl lg:mb-6 xl:rounded-3xl">
        <a
          href={`/episode/${podcast.id}`}
          className="absolute inset-0 z-[1] transition hover:bg-white/10"
        />
        <img
          src={podcast.thumbnail}
          alt={podcast.title}
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          className="bg-tertiary absolute top-3 right-3 z-[5] grid size-8 place-content-center rounded-full text-white transition hover:rotate-90"
          title="Add Playlist"
        >
          <Plus className="w-5 h-5 fill-white" />
        </button>
        {podcast.host && (
          <div className="absolute right-0 bottom-0 flex min-w-42 items-center justify-center gap-2 rounded-t-2xl bg-white/70 p-2 text-sm font-semibold backdrop-blur-[15px] sm:p-3 lg:rounded-t-3xl lg:text-base 2xl:min-w-57">
            <Mic className="w-4 h-4" />
            <span>By {podcast.host}</span>
          </div>
        )}
      </div>

      {/* Card details */}
      <div className="relative flex justify-between gap-4 xl:gap-8">
        <div className="space-y-2.5 lg:space-y-4">
          <div className="space-y-2">
            <div className="text-secondary flex items-center gap-2 text-sm font-medium">
              {podcast.type && (
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  <span>{podcast.type}</span>
                </div>
              )}
              {podcast.episode && (
                <div className="flex items-center gap-2">
                  <span className="bg-secondary size-1 rounded-full" />
                  <span>{podcast.episode}</span>
                </div>
              )}
            </div>
            <a
              href={`/episode/${podcast.id}`}
              className="line-clamp-1 inline-block text-lg font-semibold transition hover:opacity-80 lg:text-2xl"
            >
              {podcast.title}
            </a>
          </div>
          <p>{podcast.description}</p>
          <div className="text-gray flex items-center gap-2 text-sm font-medium">
            {podcast.duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{podcast.duration}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="bg-gray size-1 rounded-full" />
              <span>{podcast.date || podcast.publishedAt}</span>
            </div>
          </div>
        </div>

        {/* Right side: menu + play */}
        <div className="flex flex-col items-end justify-between">
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="transition hover:opacity-80"
            >
              <EllipsisVertical className="w-5 h-5" />
            </button>

            {menuOpen && (
              <div className="bg-gray-light text-gray absolute right-0 z-40 w-40 space-y-4 rounded-lg px-2 py-4 font-medium shadow-lg">
                <button className="flex w-full items-center gap-2 transition hover:opacity-70">
                  <Mic className="w-4 h-4" />
                  <span>View Host</span>
                </button>
                <button className="flex w-full items-center gap-2 transition hover:opacity-70">
                  <DiscAlbum className="w-4 h-4" />
                  <span>View Show</span>
                </button>
                <button className="flex w-full items-center gap-2 transition hover:opacity-70">
                  <Share className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button className="flex w-full items-center gap-2 transition hover:opacity-70">
                  <EllipsisVertical className="w-5 h-5" />
                  <span>Download</span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            className="bg-secondary grid size-10 place-content-center rounded-full text-white transition hover:opacity-80"
            onClick={() => setShowPlaybar(true)}
          >
            <Play className="w-5 h-5 fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Automatically maps YouTubeVideo[] to Podcast[]
export function LatestPodcastsFeed({ videos }: { videos: YouTubeVideo[] }) {

  // Format publishedAt to "MMM dd, yyyy"
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

//   const podcasts: Podcast[] = videos.map((v, index) => {
//   // regex: split at first special character (-, |, :, etc.)
//   const cleanTitle = v.title.split(/[-|:–?]/)[0].trim();

//   return {
//     ...v,
//     type: "Video",
//     title: cleanTitle, // truncated title
//     episode: `Episode ${index + 1}`,
//     date: formatDate(v.publishedAt),
//     description:
//       v.description
//         .split(" ")
//         .slice(0, 10)
//         .join(" ") + (v.description.split(" ").length > 10 ? "…" : ""),
//   };
// });

const podcasts: Podcast[] = videos.map((v, index) => ({
    ...v,
    type: "Video",
    episode: `Episode ${index + 1}`,
    date: formatDate(v.publishedAt),
    description: v.description
    .split(" ")
    .slice(0, 10)
    .join(" ") + (v.description.split(" ").length > 10 ? "…" : ""),
  }));

  return (
    <>
      <div className="relative overflow-hidden py-12 lg:py-20">
        {/* Blue radial background */}
        <span className="absolute -right-[25rem] -bottom-[6.75rem] -z-[1] h-[43.75rem] w-[43.75rem] rounded-full [background:radial-gradient(circle_at_center,#6366f1,transparent)] blur-[100px] opacity-15"></span>

        <div className="relative container">
          {/* Red radial background */}
          <span className="absolute -top-[10rem] left-0 -z-[1] h-[43.75rem] w-[43.75rem] rounded-full [background:radial-gradient(circle_at_center,#ef4444,transparent)] blur-[100px] opacity-15"></span>

          {/* Section header */}
          <div className="mb-10 space-y-2.5 text-center lg:mb-20 lg:space-y-6">
            <h2 className="relative inline text-3xl leading-10 font-medium lg:text-5xl lg:leading-14 xl:text-[64px] xl:leading-[22px]">
              <span className="absolute -top-2 -left-10 w-12 animate-pulse lg:-left-[3.25rem] lg:w-auto">
                <img
                  src="images/shape1.svg"
                  alt="shape"
                  className="h-full w-full object-contain"
                />
                <img
                  src="images/shape-dark1.svg"
                  alt="shape dark"
                  className="hidden h-full w-full object-contain"
                />
              </span>
              Latest from the {" "}
              <span className="text-tertiary relative inline-block pb-1.5">
                {/* <span className="absolute right-8 bottom-0 left-0 h-3.5">
                  <img
                    src="images/text-underline2.svg"
                    alt="underline"
                    className="h-full w-full object-contain"
                  />
                  <img
                    src="images/text-underline-dark2.svg"
                    alt="underline dark"
                    className="hidden h-full w-full object-contain"
                  />
                </span> */}
                Channel
              </span>{" "}
              
            </h2>

            <p className="mx-auto mt-4 w-full max-w-142 text-lg/6">
              Catch the pulse of the podcast world — fresh drops, viral
              episodes, and listener favorites lighting up the charts.
            </p>

            <a href="/categories.html" className="btn">
              <i data-lucide="circle-chevron-right" />
              <span> See What’s Trending </span>
            </a>
          </div>
          <div className="relative mx-auto grid w-full max-w-[86%] gap-5 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:gap-y-20">
            {podcasts.map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
