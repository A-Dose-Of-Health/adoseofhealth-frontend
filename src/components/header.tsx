"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Search, Sun, Moon } from "lucide-react";
import WaveReveal from "./animata/text/wave-reveal";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Write the navbar height as a CSS variable so other components can use it
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${el.offsetHeight}px`
      );
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 border-b border-[#737373]/10 bg-[#FEFBF4] shadow-[0px_16px_32px_-12px_rgba(88,92,95,0.06)] ${
        isScrolled ? "backdrop-blur-md" : ""
      }`}
    >
      {/* Overlay for mobile menu */}
      {showHeaderMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setShowHeaderMenu(false)}
        />
      )}

      <div className="container mx-auto flex items-center justify-between gap-2.5 py-4 xl:gap-0 xl:py-0">
        {/* Mobile Menu */}
        <div
          className={`fixed top-0 z-50 flex h-screen w-80 flex-col overflow-y-auto bg-gray-100 pb-5 shadow-sm transition-all duration-500 xl:static xl:h-auto xl:w-[42%] xl:flex-row xl:items-center xl:gap-14 xl:overflow-hidden xl:bg-transparent xl:p-0 xl:shadow-none ${
            showHeaderMenu ? "right-0" : "-right-full"
          }`}
        >
          <div className="sticky top-0 z-50 flex justify-between gap-5 border-b border-[#737373]/10 bg-gray-100 p-5 xl:hidden">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/assets/images/logo.svg"
                alt="A Dose of Health logo"
                width={64}
                height={64}
                className="h-16 w-auto"
              />
            </Link>
            <button
              type="button"
              className="group xl:hidden"
              onClick={() => setShowHeaderMenu(false)}
            >
              <X className="size-6 text-gray group-hover:text-secondary" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          {/* Nav Links */}
          <ul className="flex flex-col gap-2.5 p-5 xl:flex-row xl:items-center xl:gap-8 xl:p-0">
            {["Home", "Health Library", "Media Hub", "About Us", "Resources"].map(
              (item, idx) => {
                let href = "/";
                if (item === "Home") href = "/";
                else if (item === "Media Hub")
                  href = "/media-hub"; // special case
                else if (item === "Resources")
                  href = "/health-resources"; 
                else href = `/${item.toLowerCase().replace(/\s+/g, "-")}`;

                return (
                  <li key={idx}>
                    <Link href={href} className="nav-links">
                      {item}
                    </Link>
                  </li>
                );
              }
            )}
            <li className="sm:hidden">
              <Link
                href="/sign-in"
                className="inline-flex w-full items-center justify-center rounded-full bg-secondary px-6 py-3 text-base font-medium text-white transition hover:bg-secondary/90"
              >
                Sign in
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <div className="inline-flex shrink-0 items-center justify-center">
          <Link href="/" className="inline-flex items-center">
            {/* Uncomment for image logo */}
            {/* <Image
          src="/assets/images/logo.svg"
          alt="A Dose of Health logo"
          width={64}
          height={64}
          className="h-16 w-auto"
        /> */}
            <WaveReveal
              className="text-foreground"
              direction="up"
              duration="600ms"
              letterClassName="font-chrcy font-medium text-primary text-xl sm:text-2xl md:text-3xl lg:text-4xl"
              mode="word"
              text="A dose of health"
            />
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex grow items-center justify-end gap-2.5 xl:w-[42%] xl:gap-4 xl:pl-5">
          {/* Desktop Search */}
          <div className="relative hidden w-full max-w-[320px] grow lg:block">
            <input
              type="text"
              className="form-input pl-10"
              placeholder="Search podcasts, topics, or hosts…"
            />
            <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray" />
          </div>

          {/* Mobile Search */}
          <div className="relative grid place-content-center lg:hidden">
            {showSearch && (
              <form
                className="absolute inset-x-0 top-1/2 z-10 mx-3 -translate-y-1/2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowSearch(false);
                }}
              >
                <div className="relative">
                  <input
                    type="text"
                    className="form-input border border-black/10 bg-white pl-10"
                    placeholder="Search podcasts, topics, or hosts…"
                  />
                  <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray" />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowSearch(false)}
                  >
                    <X className="size-5" />
                  </button>
                </div>
              </form>
            )}
            <button
              type="button"
              className="group lg:hidden"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="size-5 text-gray group-hover:text-secondary" />
              <span className="sr-only">Open search</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="group xl:hidden"
            onClick={() => setShowHeaderMenu(!showHeaderMenu)}
          >
            <Menu className="size-5 text-gray group-hover:text-secondary" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
