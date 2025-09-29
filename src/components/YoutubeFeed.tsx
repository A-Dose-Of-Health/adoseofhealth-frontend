"use client";

import Image from "next/image";
import Link from "next/link";
import type { YouTubeVideo } from "@/lib/fetchYoutube";

interface YoutubeFeedProps {
  videos: YouTubeVideo[];
  title: string;
}

export function YoutubeFeed({ videos, title }: YoutubeFeedProps) {
  return (
    <section className="my-8">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <li key={video.id} className="rounded-lg shadow overflow-hidden">
            <Link
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={video.thumbnail}
                alt={video.title}
                width={320}
                height={180}
                className="w-full h-auto object-cover"
                unoptimized
              />
              <div className="p-3">
                <h3 className="font-medium text-sm line-clamp-2">{video.title}</h3>
                <p className="text-xs text-gray-500">
                  {new Date(video.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
