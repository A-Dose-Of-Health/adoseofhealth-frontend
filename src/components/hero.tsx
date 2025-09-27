"use client";

export function Hero() {
  return (
    <div className="relative overflow-hidden py-12 lg:py-14">
      {/* Radial BG shape */}
      <span className="absolute -right-[25rem] -bottom-[6.75rem] -z-[1] h-[43.75rem] w-[43.75rem] rounded-full [background:radial-gradient(circle_at_center,#6366f1,transparent)] blur-[100px] opacity-15"></span>


      {/* Lines */}
      <img
        src="images/hero-lines.png"
        alt="hero-lines"
        className="absolute inset-x-0 bottom-0 h-auto w-full"
      />
      <img
        src="images/hero-lines2.png"
        alt="hero-lines"
        className="absolute inset-x-0 bottom-0 hidden h-auto w-full"
      />

      {/* Dots */}
      <img
        src="images/hero-dots.png"
        alt="hero-dots"
        className="absolute top-[8.875rem] left-0"
      />
      <img
        src="images/hero-dots2.png"
        alt="hero-dots"
        className="absolute top-[8.875rem] left-0 hidden"
      />

      <div className="relative container flex flex-col gap-10 sm:items-center lg:flex-row">
        {/* Pink radial background */}
        <span className="absolute -top-[30rem] left-0 -z-[1] h-[43.75rem] w-[43.75rem] rounded-full [background:radial-gradient(circle_at_center,#ef4444,transparent)] blur-[100px] opacity-15"></span>

        {/* Left column */}
        <div className="w-full space-y-8 sm:space-y-16 lg:max-w-[24rem] xl:max-w-[30rem] 2xl:max-w-[35rem]">
          <div className="space-y-4 md:space-y-6">
            <h1 className=" text-2xl leading-10 font-medium sm:text-5xl sm:leading-[4rem] xl:text-6xl xl:leading-[5rem] 2xl:text-7xl 2xl:leading-[6rem]">
              Lorem ipsum is a {" "}
              <span className="text-primary dark:text-tertiary relative inline-bloc">
                {/* <span className="absolute -right-2 bottom-0 text-primary">
                  <img
                    src="images/text-underline.svg"
                    alt="underline"
                    className="object-contain text-primary"
                  />
                  <img
                    src="images/text-underline-dark.svg"
                    alt="underline"
                    className="hidden object-contain text-primary"
                  />
                </span> */}
                standard
              </span>
            </h1>

            <p className="lg:max-w-[24.5rem] lg:text-lg">
              Explore voices from around the globe—stories, insights, and
              perspectives curated just for you.
            </p>

            {/* Buttons */}
            <div className="flex gap-2.5 lg:gap-6">
              <a href="/playlist.html" className="btn">
                {/* Replace with Lucide React later */}
                <i
                  data-lucide="circle-play"
                  className="fill-tertiary text-tertiary !mx-1.5 !size-6 !shrink-0 sm:!mx-2 sm:!size-8 [&>_polygon]:fill-white [&>_polygon]:text-white"
                ></i>
                <span>Start listening</span>
              </a>

              <a href="/contact.html" className="group btn text-black">
                <i data-lucide="circle-chevron-right"></i>
                <span className="!bg-white ring-1 ring-black ring-inset group-hover:ring-white">
                  Explore now
                </span>
              </a>
            </div>
          </div>

          {/* Listener stats */}
          <div className="inline-flex items-center gap-4 sm:rounded-full sm:bg-[#E3330A]/10 sm:px-6 sm:py-2.5 sm:ring-1 sm:ring-black/10 sm:backdrop-blur-[1px] sm:ring-inset lg:py-4">
            <div className="flex">
              <div className="size-10 overflow-hidden rounded-full border-2 border-white lg:size-12">
                <img
                  src="images/profile1.png"
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="-ml-[1.125rem] size-10 overflow-hidden rounded-full border-2 border-white lg:size-12">
                <img
                  src="images/profile2.png"
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="-ml-[1.125rem] size-10 overflow-hidden rounded-full border-2 border-white lg:size-12">
                <img
                  src="images/profile3.png"
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="-ml-[1.125rem] size-10 overflow-hidden rounded-full border-2 border-white lg:size-12">
                <img
                  src="images/profile4.png"
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="sm:space-y-1">
              <p className="font-semibold lg:text-lg leading-6">500M+</p>
              <span className="text-sm lg:text-base leading-[1.375rem]">
                Daily podcast listeners
              </span>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex grow items-center">
          {/* Yellow oval background */}
          <div className="relative z-[1] hidden h-[30rem] w-[17.5rem] overflow-hidden rounded-full bg-[#FFC540] sm:block lg:h-[37.5rem] xl:w-[20rem] 2xl:h-[44.375rem] 2xl:w-[25.5rem]">
            <img
              src="images/hero-img1.png"
              alt="hero img"
              className="absolute z-[1] h-full w-full object-contain object-bottom"
            />
          </div>

          <div className="w-full space-y-5 sm:-ml-5 sm:max-w-[35rem] sm:space-y-14 lg:space-y-[4.375rem] xl:-ml-10 2xl:max-w-[37.5rem]">
            {/* Black box */}
            <div className="relative overflow-hidden rounded-r-full bg-black py-7 pr-24 pl-4 sm:p-10 xl:p-14 xl:pr-32 2xl:p-[4.625rem]">
              <h2 className="text-tertiary relative z-[1] w-full text-xl leading-7 font-semibold sm:max-w-[18.75rem] sm:text-2xl sm:leading-8 2xl:text-[32px] 2xl:leading-[2.75rem]">
                Hear directly from the people shaping tomorrow’s ideas.
              </h2>
              <img
                src="images/hero-img2.png"
                alt="hero img"
                className="absolute right-0 bottom-0 w-40 sm:w-50 xl:w-60 2xl:w-auto"
              />
            </div>

            {/* Episode card */}
            <div className="relative z-[1] flex justify-between gap-5 rounded-2xl bg-[#FFFCF5]/20 p-4 shadow-[8px_8px_20px_0px_rgba(0,0,0,0.05)] ring-1 ring-black/10 backdrop-blur-[2px] ring-inset sm:mr-10 sm:rounded-4xl sm:p-6 2xl:mr-[4.25rem]">
              <div className="absolute -top-10 -right-16 hidden animate-[bounce_4s_infinite] sm:block">
                <img
                  src="images/new-text.svg"
                  alt="new-text"
                  className="object-contain"
                />
                <img
                  src="images/new-text2.svg"
                  alt="new-text"
                  className="hidden object-contain"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="grow">
                  <p className="text-secondary mb-1 text-sm leading-5 font-medium">
                    Episode 17
                  </p>
                  <h3 className="w-full max-w-[11.75rem] text-lg leading-6 font-semibold sm:leading-7 xl:text-2xl xl:leading-[2.125rem]">
                    The Psychology of Audio UX
                  </h3>
                </div>
                <p>Hosted by Emily Roach</p>
              </div>

              {/* Episode thumbnail */}
              <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl sm:size-24 xl:size-[8.75rem] xl:rounded-[2rem]">
                <img
                  src="images/hero-img3.jpg"
                  alt="hero img"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  className="text-secondary absolute top-1/2 left-1/2 grid size-10 shrink-0 -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full bg-white/80 backdrop-blur-[2px] duration-300 sm:hover:scale-105"
                >
                  <i data-lucide="play" className="fill-secondary size-5"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
