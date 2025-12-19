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

export function MediaHubHeroSection() {
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
    <div className="relative overflow-hidden">
      {/* ================= Radial Glows ================= */}
      <motion.span
        aria-hidden
        style={{ x: driftX1, y: driftY1 }}
        className="pointer-events-none absolute -right-[25rem] -bottom-[6.75rem] z-10
        h-[44rem] w-[44rem] rounded-full
        [background:radial-gradient(circle_at_center,#6366f1,transparent_65%)]
        blur-[130px] opacity-20 will-change-transform transform-gpu"
      />

      <motion.span
        aria-hidden
        style={{ x: driftX2, y: driftY2 }}
        className="pointer-events-none absolute -top-[30rem] left-0 z-10
        h-[44rem] w-[44rem] rounded-full
        [background:radial-gradient(circle_at_center,#ef4444,transparent_65%)]
        blur-[130px] opacity-20 will-change-transform transform-gpu"
      />

      {/* ================= Hero ================= */}
      <header className="relative h-[70vh] overflow-hidden">
        {/* Background image */}
        <motion.div
          className="absolute inset-0 z-0 bg-cover bg-center
          will-change-transform transform-gpu"
          aria-hidden
          style={{
            backgroundImage: "url('./images/mediahubhero.pngf')",
            y: bgY,
          }}
        />

        {/* Contrast overlay */}
        {/* <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/10 to-transparent" /> */}

        {/* Bottom reveal mask */}
        {/* <div className="absolute bottom-0 left-0 right-0 z-[2] h-40 bg-gradient-to-b from-transparent to-background" /> */}

        {/* ================= Content ================= */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-white">
          <motion.div
            style={{ y: titleY }}
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
          </motion.div>
          <p></p>

          {/* <motion.p
            style={{ y: subtitleY }}
            className="text-lg md:text-xl text-white/95 will-change-transform transform-gpu"
          >
            A curated collection of breathtaking moments
          </motion.p> */}
        </div>
      </header>
    </div>
  );
}
