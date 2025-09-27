"use client";

import Link from "next/link";
// import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = 100; // Distance over which transition occurs
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
              <span className="text-black font-bold text-base">A</span>
            </div>
            <span className="text-white text-lg font-chrcy font-bold">
              ADOH
            </span>
          </Link>

          <div
            className={`hidden md:flex items-center space-x-8 px-6 py-3 rounded-full transition-all duration-700 ease-out backdrop-blur-xl ${
              scrollProgress > 0 ? "bg-primedark" : ""
            }`}
            style={{
              borderColor: `rgba(255, 255, 255, ${0.2 * scrollProgress})`,
              borderWidth: scrollProgress > 0 ? "1.5px" : "0px",
              boxShadow: `0 0 20px 0 hsla(0,0%,100%,${0.1 * scrollProgress})`,
            }}
          >
            <Link
              href="/overview"
              className="text-white/80 hover:text-white transition-colors text-base font-medium"
            >
              Overview
            </Link>
            <Link
              href="/features"
              className="text-white/80 hover:text-white transition-colors text-base font-medium"
            >
              Features
            </Link>
            <Link
              href="/roadmap"
              className="text-white/80 hover:text-white transition-colors text-base font-medium"
            >
              Roadmap
            </Link>
            <Link
              href="/faq"
              className="text-white/80 hover:text-white transition-colors text-base font-medium"
            >
              FAQ
            </Link>
            <Link
              href="/about"
              className="text-white/80 hover:text-white transition-colors text-base font-medium"
            >
              About Us
            </Link>
          </div>

          {/* Get Started Button */}
          <div className="cursor-pointer bg-primary hover:bg-orange-500 text-white px-6 py-2 rounded-full text-base font-medium transition-colors">
            Contact Us →
          </div>
        </div>
      </div>
    </nav>
  );
}
