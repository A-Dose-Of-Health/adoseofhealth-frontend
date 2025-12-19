"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValue,
  animate,
} from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import FrostedTabs from "./FrostedTabs";

export function MediaHubHeroSection1() {
  /* ================= Accessibility ================= */
  const reduceMotion = useReducedMotion();

  /* ================= Scroll ================= */
  const { scrollY } = useScroll();

  /* ================= Raw Parallax Transforms ================= */
  const bgYRaw = useTransform(scrollY, [0, 800], [0, 220], { clamp: true });
  const titleYRaw = useTransform(scrollY, [0, 500], [0, 100], { clamp: true });
  const subtitleYRaw = useTransform(scrollY, [0, 500], [0, 70], {
    clamp: true,
  });

  /* ================= Springs (Inertia) ================= */
  const bgY = reduceMotion ? 0 : bgYRaw;

  const titleY = reduceMotion
    ? 0
    : useSpring(titleYRaw, { stiffness: 60, damping: 18 });

  const subtitleY = reduceMotion
    ? 0
    : useSpring(subtitleYRaw, { stiffness: 55, damping: 16 });

  /* ================= Organic Radial Drift ================= */
  const driftX1 = useMotionValue(0);
  const driftY1 = useMotionValue(0);
  const driftX2 = useMotionValue(0);
  const driftY2 = useMotionValue(0);

  useEffect(() => {
    if (reduceMotion) return;

    const a1 = animate(driftX1, [0, -40, 0, 30, 0], {
      duration: 40,
      repeat: Infinity,
      ease: "easeInOut",
    });

    const a2 = animate(driftY1, [0, 30, -20, 0], {
      duration: 32,
      repeat: Infinity,
      ease: "easeInOut",
    });

    const a3 = animate(driftX2, [0, 50, 0, -30, 0], {
      duration: 45,
      repeat: Infinity,
      ease: "easeInOut",
    });

    const a4 = animate(driftY2, [0, -30, 20, 0], {
      duration: 36,
      repeat: Infinity,
      ease: "easeInOut",
    });

    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
      a4.stop();
    };
  }, [reduceMotion, driftX1, driftY1, driftX2, driftY2]);

  return (
    <div className="relative overflow-hidden pt-12 lg:pt-20">
            {/* Radial BG shape */}
      {/* <span className="absolute -right-[25rem] -bottom-[6.75rem] -z-[1] h-[43.75rem] w-[43.75rem] rounded-full [background:radial-gradient(circle_at_center,#6366f1,transparent)] blur-[100px] opacity-15"></span> */}
              {/* Pink radial background */}
        <span className="absolute -top-[30rem] left-0 -z-[1] h-[43.75rem] w-[43.75rem] rounded-full [background:radial-gradient(circle_at_center,#ef4444,transparent)] blur-[100px] opacity-15"></span>




      {/* Hero Images */}
      <span className="absolute inset-x-0 -top-[25px] bottom-0">
        <Image
          src="/images/playlist-heroline.png"
          alt="hero-lines"
          width={1905}
          height={488}
          className="h-full w-full dark:hidden"
          priority
        />
        <Image
          src="/images/playlist-heroline-dark.png"
          alt="hero-lines"
          width={1905}
          height={488}
          className="hidden h-full w-full dark:block"
          priority
        />
      </span>

      {/* Container */}
      <div className="relative container mx-auto mb-6">
        <span className="absolute -top-[128px] -left-10 -z-1 w-[175px] h-[175px] rounded-full bg-radial from-[#F96D6E]/20 to-transparent blur-[100px] dark:hidden"></span>

        {/* Breadcrumbs */}
        {/* <div className="mb-2 flex items-center justify-center gap-1 text-sm font-medium text-gray-500 md:gap-2 dark:text-white">
          <a href="/" className="transition hover:text-black dark:hover:text-white/80">
            Home
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 stroke-3"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <span className="text-secondary dark:text-primary">Playlist</span>
        </div> */}

        {/* Hero Text */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-white">
                  <div
                    className=" will-change-transform transform-gpu"
                  >
                    <Image
                      src="/images/ADOHMediaHub.svg"
                      alt="Media Hub Logo"
                      width={240}
                      height={240}
                      // brightness-0 turns everything black; invert-1 turns it white
                      className="brightness-10 invert-[0] sepia-[1] hue-rotate-[200deg]"
                    />
                  </div>
                  </div>
        <div className="text-center">
          {/* <h1 className="font-chrcy font-medium mb-2 text-3xl sm:text-5xl xl:text-6xl 2xl:text-7xl tracking-normal">
            media hub
          </h1> */}
          {/* <p className="mb-6 lg:text-lg">
            Interactive health learning through videos, podcasts, articles, and games
          </p> */}

          {/* Button */}
          {/* <button
            type="button"
            className="group inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-white text-base font-medium whitespace-nowrap transition disabled:pointer-events-none shrink-0 dark:bg-white/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 mr-2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m10 8 4 4-4 4"></path>
            </svg>
            <span>Create new playlist</span>
          </button> */}
          
        </div>
      </div>
      <FrostedTabs/>
    </div>
  );
}
