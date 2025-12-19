"use client";
import { useState } from "react";
import { PodcastEpisode } from "@/types/podcast";   // ✅ FIXED

interface Props {
  episodes: PodcastEpisode[];
}

export default function PodcastPlayer({ episodes }: Props) {
  const [current] = useState(episodes[0]);

  if (!current?.episodeId) {
    return <p className="text-gray-500">No player available for this episode.</p>;
  }

  return (
    <div className="mt-6 aspect-video w-full rounded-xl overflow-hidden shadow">
      <iframe
        key={current.episodeId}
        src={`https://open.spotify.com/embed/episode/${current.episodeId}`}
        width="100%"
        height="232"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}
