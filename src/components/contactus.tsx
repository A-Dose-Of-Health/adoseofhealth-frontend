"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function ContactUs() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "light", // ✅ force light mode only
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#315E66",
          },
        } as any, // cast the whole object
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <>
      <div className="relative overflow-hidden p-4 mx-auto ">
        <div className="bg-[#1E444C] rounded-3xl h-full w-full py-12 lg:py-60 ">
          {/* Top radial blob */}
        <span className="absolute top-0 -right-[300px] -z-10 w-[600px] h-[600px] rounded-full bg-gradient-radial from-secondary/20 to-transparent blur-[100px]" />

        <div className="relative container mx-auto flex w-full flex-col items-center lg:flex-row xl:max-w-[1296px]">
          {/* Bottom radial blob */}
          <span className="absolute -bottom-[400px] -left-[240px] -z-10 w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#F96D6E]/20 to-transparent blur-[100px]" />

          {/* Image */}
          <div className="relative h-80 w-full overflow-hidden rounded-2xl sm:h-[400px] lg:h-auto lg:w-[1800px] lg:rounded-3xl xl:rounded-[2rem]">
      <img
        alt="contact-hero"
        loading="lazy"
        width={669}
        height={801}
        className="h-full w-full object-cover"
        src="/images/contact.jpg"
      />

      {/* Overlay glass effect */}
      
    </div>

          {/* Form container */}
          <div className="relative -mt-10 w-full max-w-[635px] rounded-2xl border border-black bg-white p-3 shadow-[0_16px_32px_-12px_rgba(88,92,95,0.06)] sm:mx-5 lg:mr-0 lg:-ml-10 lg:rounded-3xl xl:rounded-[2rem] ">
            <form className="flex flex-col">
              <Cal
                namespace="30min"
                calLink="gichuru-wamugi-sp5pvk/30min"
                style={{ width: "100%", height: "100%", overflow: "auto" }}
                config={{ layout: "month_view", theme: "light" }}
              />
            </form>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
