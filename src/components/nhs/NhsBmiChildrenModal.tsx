"use client";

import * as React from "react";
import Script from "next/script";
import { X, Ruler, Users } from "lucide-react";

type Props = {
  syndicatorId?: string;
  buttonLabel?: string;
  title?: string;
  description?: string;
};

export function NhsBmiChildrenModal({
  syndicatorId = "10500",
  buttonLabel = "Calculate BMI (Children & Teens)",
  title = "NHS BMI Calculator (Children & Teens)",
  description = "Calculate BMI for children and teenagers using the official NHS tool.",
}: Props) {
  const [open, setOpen] = React.useState(false);

  // ESC to close
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock body scroll when open
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* Load launcher ONCE (never unmount) */}
      <Script
        id="nhsuk-toolscbmit_widget-launcher"
        src="https://www.nhs.uk/health-assessment-tools/calculate-your-body-mass-index/calculate-bmi-for-children-teenagers/assets/scripts/widget-launcher.js"
        strategy="afterInteractive"
      />

      {/* Config present in DOM (never unmount) */}
      <script
        id="nhsuk-toolscbmit_widget-config"
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ syndicatorId }),
        }}
      />

      {/* ================= Trigger "Card Button" ================= */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group bg-gray-light relative w-full rounded-lg p-3 text-left duration-300 sm:p-4 lg:rounded-lg xl:rounded-lg xl:p-6"
      >
        <span className="absolute inset-0 rounded-2xl border border-black duration-300 group-hover:-bottom-2 group-hover:border-b-8 lg:rounded-3xl xl:rounded-4xl" />

        <div className="relative z-[1] flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="text-primary flex items-center gap-2 text-sm font-medium">
              <Ruler className="h-4 w-4" />
              <span>Health tool</span>
              <span className="bg-primary size-1 rounded-full" />
              <span>NHS.UK</span>
            </div>

            <div className="text-lg font-semibold transition group-hover:opacity-80 lg:text-2xl">
              {buttonLabel}
            </div>

            <p className="text-gray text-sm font-medium sm:text-base">
              {description}
            </p>
          </div>

          <span className="bg-primary grid size-10 shrink-0 place-content-center rounded-full text-white transition group-hover:opacity-80">
            <Users className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
      </button>

      {/* ================= Modal (NOT unmounted; only toggled) ================= */}
      <div
        className={[
          "fixed inset-0 z-[100] p-4",
          open ? "block" : "hidden",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
          aria-label="Close modal"
        />

        <div className="relative z-[101] mx-auto mt-[6vh] w-full max-w-4xl">
          <div className="group bg-white relative overflow-hidden rounded-2xl p-3 duration-300 sm:p-4 lg:rounded-3xl xl:rounded-4xl xl:p-6">
            <span className="absolute inset-0 rounded-2xl border border-black duration-300 group-hover:-bottom-2 group-hover:border-b-8 lg:rounded-3xl xl:rounded-4xl" />

            <div className="relative z-[1]">
              <div className="mb-4 flex items-start justify-between gap-4 lg:mb-6">
                <div className="space-y-2">
                  <div className="text-primary flex items-center gap-2 text-sm font-medium">
                    <Ruler className="h-4 w-4" />
                    <span>NHS tool</span>
                    <span className="bg-primary size-1 rounded-full" />
                    <span>BMI (Children & Teens)</span>
                  </div>

                  <h3 className="text-lg font-semibold lg:text-2xl">{title}</h3>
                  <p className="text-gray text-sm font-medium lg:text-base">
                    {description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid size-10 place-content-center rounded-full border border-black transition hover:opacity-80"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="relative">
                <div className="max-h-[60vh] overflow-auto rounded-2xl bg-white/70 p-3 backdrop-blur-[15px] sm:p-4 lg:rounded-3xl">
                  {/* NHS mount point - keep it mounted */}
                  <div id="nhsuk-toolscbmit_widget" />
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <a
                    className="text-primary inline-flex items-center gap-2 text-sm font-medium transition hover:opacity-80"
                    href="https://www.nhs.uk/health-assessment-tools/calculate-your-body-mass-index/calculate-bmi-for-children-teenagers/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="bg-primary size-1 rounded-full" />
                    Open on NHS.UK
                  </a>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="bg-primary grid size-10 place-content-center rounded-full text-white transition hover:opacity-80"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-3 text-center text-xs text-white/80">
            Tip: Press <span className="font-semibold">Esc</span> to close.
          </p>
        </div>
      </div>
    </>
  );
}