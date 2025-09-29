"use client";

import React from "react";
import { Map } from "lucide-react";

import { cn } from "@/lib/utils";
import AnimatedGradientText from "../text/animated-gradient-text";
import WaveReveal from "../text/wave-reveal";
import BlurryBlob from "../background/blurry-blob";

interface ItemProps {
  emoji: string;
  position: string;
}

interface HeroCardProps {
  destinations?: ItemProps[];
  treasures?: ItemProps[];
  className?: string;
}

const HeroSectionTextHover: React.FC<HeroCardProps> = ({ className }) => {
  const destinations: ItemProps[] = [
    {
      emoji: "🪂",
      position:
        "-left-20 top-3 group-hover:-rotate-[10deg] group-hover:-translate-y-12 md:-left-28 md:-top-2 sm:-left-24",
    },
    {
      emoji: "🏖️",
      position:
        "-left-[72px] top-0 group-hover:-rotate-[20deg] group-hover:-translate-x-10 md:-left-[135px] md:-top-2 sm:-left-24 ",
    },
    {
      emoji: "🚁",
      position:
        "left-[150px] top-0 group-hover:rotate-[10deg] group-hover:-translate-y-10 md:left-[210px] md:-top-1 sm:left-[180px]",
    },
    {
      emoji: "🏯",
      position:
        "left-[105px] top-0 group-hover:rotate-[20deg] group-hover:translate-x-16 md:left-[190px] md:-top-2 sm:left-[150px]",
    },
  ];

  const treasures: ItemProps[] = [
    {
      emoji: "🦝",
      position:
        "-left-[100px] -top-7 -rotate-[30deg] group-hover:-translate-y-8 md:-left-40 md:-top-16 sm:-left-32",
    },
    {
      emoji: "🍜",
      position:
        "-left-[115px] -top-2 group-hover:-rotate-45 md:-left-44 md:-top-1 sm:-left-36",
    },
    {
      emoji: "🏝️",
      position:
        "left-32 -top-12 rotate-[30deg] md:left-[200px] md:-top-[70px] sm:left-[175px] sm:-top-12",
    },
    {
      emoji: "💎",
      position:
        "left-32 -top-2 group-hover:rotate-[45deg] md:left-[200px] md:-top-1 sm:left-[160px] ",
    },
  ];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-full bg-primary",
        className
      )}
    >
      {/* <BlurryBlob
        className="rounded-xl opacity-45 z-[0]"
        firstBlobColor="bg-purple-400"
        secondBlobColor="bg-blue-400"
      /> */}

      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <div className="text-normal flex flex-col items-center justify-center font-medium sm:text-xl md:text-2xl leading-none">
          {/* <AnimatedGradientText className="mt-5 font-chrcy font-medium text-9xl ">
            A Dose of Health
          </AnimatedGradientText> */}

          {/* <div className="">
            <Map size={40} className="fill-zinc-900 text-amber-50" />
          </div> */}

          <WaveReveal
            className="text-foreground "
            direction="up"
            duration="600ms"
            letterClassName="mt-10 font-chrcy text-6xl text-accent"
            mode="word"
            text="A Dose of Health"
          />
          {/* <div className="flex items-center justify-center gap-1">
            <span className="text-primedark">
              We provide empowering, sustainable, and fun solutions for
              your health
            </span>
          </div> */}
          <div className="flex items-center justify-center gap-1">
            {/* <span className="text-primedark">
              so you can focus on what really matters:
            </span> */}
            <div className="group relative flex items-center">
              {/* <span className="text-zinc-300 group-hover:text-sky-400">
                feeling good
              </span> */}
              {/* <AnimatedGradientText className="group-hover:text-sky-400">
                feeling good
              </AnimatedGradientText>
              <div className="duration-400 absolute inset-0 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100">
                {destinations.map((dest, index) => (
                  <span
                    key={index}
                    className={cn(
                      "pointer-events-none absolute transform text-lg transition-transform duration-500 group-hover:scale-110 sm:text-2xl md:text-4xl",
                      dest.position
                    )}
                  >
                    {dest.emoji}
                  </span>
                ))}
              </div> */}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1">
            {/* <span className="text-amber-50">and</span> */}
            <div className="group relative flex items-center">
              {/* <span className="text-zinc-300 group-hover:text-orange-500">
                enjoying life
              </span> */}
              {/* <AnimatedGradientText className="group-hover:text-sky-400">
                enjoying life.
              </AnimatedGradientText> */}
              {/* <div className="duration-400 absolute inset-0 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100">
                {treasures.map((gem, index) => (
                  <span
                    key={index}
                    className={cn(
                      "pointer-events-none absolute transform text-lg transition-transform duration-500 group-hover:scale-110 sm:text-2xl md:text-4xl",
                      gem.position
                    )}
                  >
                    {gem.emoji}
                  </span>
                ))}
              </div> */}
            </div>
          </div>
        </div>
        {/* <button className="cursor-pointer rounded-3xl bg-primary px-4 py-2 font-mono tracking-tighter hover:bg-orange-500">
          Begin your journey
        </button> */}
      </div>
      
    </div>
  );
};

export default HeroSectionTextHover;
