"use client";

import { useState } from "react";
import { MdxBrandLogo } from "../ui/MdxBrandLogo";

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Data types                                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */

type Urgency = "normal" | "monitor" | "provider" | "urgent";

type Result = {
  likely: string;
  urgency: Urgency;
  nextStep: string;
};

type FollowUp = {
  question: string;
  result: Result;
};

type Symptom = {
  id: string;
  letter: string;
  label: string;
  followUps: FollowUp[];
};

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Decision tree data                                                         */
/* ─────────────────────────────────────────────────────────────────────────── */

const SYMPTOMS: Symptom[] = [
  {
    id: "itching",
    letter: "A",
    label: "Itching",
    followUps: [
      {
        question: "Is the discharge thick, white, and looks like cottage cheese?",
        result: {
          likely: "Yeast infection",
          urgency: "provider",
          nextStep:
            "Over-the-counter antifungal creams can be tried. If it's your first time, you're pregnant, or it doesn't clear up, see a provider.",
        },
      },
      {
        question: "Is there a strong, fishy odour, especially after sex?",
        result: {
          likely: "Bacterial Vaginosis (BV)",
          urgency: "provider",
          nextStep:
            "See a provider for diagnosis and prescription antibiotics.",
        },
      },
      {
        question:
          "Is the itching severe, persistent, or accompanied by a rash or sores?",
        result: {
          likely: "Allergic reaction, vulvodynia, or an STI like herpes",
          urgency: "urgent",
          nextStep: "Seek medical evaluation.",
        },
      },
    ],
  },
  {
    id: "discharge",
    letter: "B",
    label: "Unusual discharge",
    followUps: [
      {
        question:
          "Is it clear or white, stretchy (like egg whites), or thick and white with no smell?",
        result: {
          likely: "Normal discharge — it changes with your cycle",
          urgency: "normal",
          nextStep:
            "No action needed. This is a sign of a healthy cycle.",
        },
      },
      {
        question:
          "Is it greyish or white, thin, and has a strong fishy smell?",
        result: {
          likely: "Bacterial Vaginosis (BV)",
          urgency: "provider",
          nextStep: "See a provider for diagnosis and treatment.",
        },
      },
      {
        question:
          "Is it yellow or green, frothy, and has a bad smell?",
        result: {
          likely: "Possible STI like trichomoniasis",
          urgency: "urgent",
          nextStep: "Seek medical evaluation and STI testing.",
        },
      },
      {
        question:
          "Is it thick, white, and cottage cheese-like with itching?",
        result: {
          likely: "Yeast infection",
          urgency: "provider",
          nextStep:
            "Over-the-counter antifungal creams can be tried. See a provider if it's recurrent.",
        },
      },
    ],
  },
  {
    id: "smell",
    letter: "C",
    label: "Bad smell",
    followUps: [
      {
        question:
          "Is it a mild, musky smell that comes and goes?",
        result: {
          likely: "Normal — all vulvas have a natural scent that can change with sweat, cycle, and diet",
          urgency: "normal",
          nextStep:
            "No action needed. Gentle daily hygiene with water is sufficient.",
        },
      },
      {
        question: "Is it a strong, persistent fishy smell?",
        result: {
          likely: "Bacterial Vaginosis (BV) or trichomoniasis",
          urgency: "provider",
          nextStep: "Seek medical evaluation.",
        },
      },
    ],
  },
  {
    id: "bleeding",
    letter: "D",
    label: "Bleeding outside your period",
    followUps: [
      {
        question: "Does it happen right after sex (post-coital bleeding)?",
        result: {
          likely: "Cervical inflammation (cervicitis), polyps, or STI",
          urgency: "provider",
          nextStep: "Needs evaluation by a provider.",
        },
      },
      {
        question:
          "Are you past menopause and experiencing any bleeding?",
        result: {
          likely: "Needs immediate investigation to rule out serious conditions",
          urgency: "urgent",
          nextStep: "Urgent medical evaluation required.",
        },
      },
      {
        question:
          "Is it light spotting between cycles, especially around ovulation?",
        result: {
          likely: "Ovulation spotting, which can be normal for some",
          urgency: "monitor",
          nextStep:
            "Monitor. If it happens for more than 1–2 cycles or is heavy, consult a provider.",
        },
      },
    ],
  },
  {
    id: "pain",
    letter: "E",
    label: "Pain during sex",
    followUps: [
      {
        question: "Is it pain at the entrance (upon penetration)?",
        result: {
          likely: "Vaginismus, vulvodynia, vaginal dryness, or infection",
          urgency: "provider",
          nextStep:
            "Try a water-based lubricant. If pain persists, see a provider.",
        },
      },
      {
        question: "Is it deep pain (during thrusting)?",
        result: {
          likely:
            "Endometriosis, pelvic inflammatory disease (PID), fibroids, or ovarian cysts",
          urgency: "urgent",
          nextStep:
            "Seek medical evaluation for a pelvic exam and possibly an ultrasound.",
        },
      },
    ],
  },
  {
    id: "worried",
    letter: "F",
    label: "No symptoms but worried",
    followUps: [
      {
        question: "Have you had unprotected sex?",
        result: {
          likely: "Possible STI exposure — many STIs have no symptoms",
          urgency: "provider",
          nextStep: "Consider STI testing.",
        },
      },
      {
        question: "Are you due for a routine check-up?",
        result: {
          likely: "Routine screening recommended",
          urgency: "monitor",
          nextStep:
            "Book a routine pelvic exam and cervical screening (Pap smear) as recommended for your age.",
        },
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Urgency config                                                             */
/* ─────────────────────────────────────────────────────────────────────────── */

const URGENCY: Record<
  Urgency,
  { label: string; bg: string; border: string; text: string; dot: string; badge: string }
> = {
  normal: {
    label: "No action needed",
    bg: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-800",
    dot: "bg-teal-500",
    badge: "bg-teal-100 text-teal-700",
  },
  monitor: {
    label: "Monitor",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-800",
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700",
  },
  provider: {
    label: "See a provider",
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-800",
    dot: "bg-rose-500",
    badge: "bg-rose-100 text-rose-700",
  },
  urgent: {
    label: "Seek evaluation",
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-800",
    dot: "bg-rose-500",
    badge: "bg-rose-100 text-rose-700",
  },
};

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Step indicator                                                             */
/* ─────────────────────────────────────────────────────────────────────────── */

function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: "Symptom" },
    { n: 2, label: "Description" },
    { n: 3, label: "Guidance" },
  ];
  return (
    <div className="mb-6 flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[0.6rem] font-bold transition-colors ${
                step === s.n
                  ? "bg-sky-500 text-white"
                  : step > s.n
                  ? "bg-sky-200 text-sky-700"
                  : "bg-sky-200 text-sky-500"
              }`}
            >
              {step > s.n ? (
                <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 fill-none stroke-current stroke-[1.5]">
                  <path d="M2 5l2.5 2.5 3.5-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                s.n
              )}
            </span>
            <span
              className={`text-[0.65rem] font-semibold uppercase tracking-wider ${
                step === s.n ? "text-sky-700" : step > s.n ? "text-sky-500" : "text-sky-500"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <span className={`h-px w-6 ${step > s.n ? "bg-sky-400" : "bg-sky-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MdxSymptomChecker — main export                                            */
/* ─────────────────────────────────────────────────────────────────────────── */

/**
 * MdxSymptomChecker — interactive "Is This Normal?" decision-tree tool.
 *
 * Self-contained client component. No props needed.
 * Register once and use anywhere in MDX with no configuration.
 *
 * Registration:
 * ```ts
 * import { MdxSymptomChecker } from "@/components/mdx/MdxSymptomChecker";
 * export const mdxComponents = { MdxSymptomChecker };
 * ```
 *
 * Usage in any MDX file:
 * ```mdx
 * <MdxSymptomChecker />
 * ```
 */
export function MdxSymptomChecker() {
  const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(null);
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);

  const step: 1 | 2 | 3 = selectedFollowUp ? 3 : selectedSymptom ? 2 : 1;

  const reset = () => {
    setSelectedSymptom(null);
    setSelectedFollowUp(null);
  };

  const backToSymptoms = () => {
    setSelectedFollowUp(null);
    setSelectedSymptom(null);
  };

  const backToFollowUps = () => {
    setSelectedFollowUp(null);
  };

  return (
    <div className="not-prose my-8 w-full overflow-hidden rounded-2xl border border-sky-600/60 shadow-sm">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="border-b border-sky-600/60 bg-sky-500/35 px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <dd className="text-[0.7rem] font-bold uppercase tracking-widest !text-sky-600">
              Interactive Tool
            </dd>
            <h3 className="!my-1 text-base font-semibold !text-sky-800">
              Is This Normal?
            </h3>
          </div>
          {step > 1 && (
            <button
              onClick={reset}
              className="shrink-0 rounded-full bg-sky-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-sky-500 shadow-sm ring-1 ring-sky-300 transition-colors hover:border-sky-300 hover:text-sky-700 hover:bg-sky-100"
            >
              Start over
            </button>
          )}
        </div>

        {/* Disclaimer */}
        <span className="!mt-1 leading-relaxed text-sm text-sky-700">
          This tool is for awareness only and does not replace a medical diagnosis.
        </span>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div className="px-5 py-5 bg-sky-100/10">
        <StepIndicator step={step} />

        {/* ── Step 1: Symptom selection ─────────────────────────────────── */}
        {step === 1 && (
          <div>
            <p className="mb-4 text-sm font-medium !text-sky-700">
              What is your main symptom?
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SYMPTOMS.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => setSelectedSymptom(symptom)}
                  className="group flex items-center gap-3 rounded-xl border border-sky-200 bg-sky-50/60 px-4 py-3 text-left transition-all hover:border-sky-500 hover:bg-sky-200/60"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-200 text-[0.7rem] font-bold text-sky-700 transition-colors group-hover:bg-sky-500 group-hover:text-white">
                    {symptom.letter}
                  </span>
                  <span className="text-sm text-sky-700 group-hover:text-sky-900">
                    {symptom.label}
                  </span>
                  <svg
                    viewBox="0 0 16 16"
                    className="ml-auto h-3.5 w-3.5 shrink-0 fill-none stroke-sky-300 stroke-2 transition-colors group-hover:stroke-sky-400"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2: Follow-up questions ───────────────────────────────── */}
        {step === 2 && selectedSymptom && (
          <div>
            {/* Selected symptom pill */}
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-200 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-sky-600">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-white text-[0.55rem]">
                  {selectedSymptom.letter}
                </span>
                {selectedSymptom.label}
              </span>
            </div>

            <p className="mb-4 text-sm font-medium text-sky-700">
              Which description best matches what you're experiencing?
            </p>

            <div className="space-y-2">
              {selectedSymptom.followUps.map((followUp, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedFollowUp(followUp)}
                  className="group flex w-full items-start gap-3 rounded-xl border border-sky-200 bg-sky-50/60 px-4 py-3.5 text-left transition-all hover:border-sky-500 hover:bg-sky-200/60"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-200 text-[0.6rem] font-bold text-sky-500 transition-colors group-hover:bg-sky-500 group-hover:text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-sky-600 group-hover:text-sky-900">
                    {followUp.question}
                  </span>
                  <svg
                    viewBox="0 0 16 16"
                    className="ml-auto mt-0.5 h-3.5 w-3.5 shrink-0 fill-none stroke-sky-300 stroke-2 transition-colors group-hover:stroke-sky-400"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </button>
              ))}
            </div>

            <button
              onClick={backToSymptoms}
              className="mt-4 flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-sky-400 transition-colors hover:text-sky-700"
            >
              <svg viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 8H3M7 4L3 8l4 4" />
              </svg>
              Back
            </button>
          </div>
        )}

        {/* ── Step 3: Result ────────────────────────────────────────────── */}
        {step === 3 && selectedSymptom && selectedFollowUp && (() => {
          const u = URGENCY[selectedFollowUp.result.urgency];
          return (
            <div>
              {/* Breadcrumb */}
              <div className="mb-4 flex flex-wrap items-center gap-1.5 text-[0.65rem]">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-200 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-sky-600">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-white text-[0.55rem]">
                  {selectedSymptom.letter}
                </span>
                {selectedSymptom.label}
              </span>
                <svg viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-sky-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
                <span className="text-sky-600 line-clamp-1 max-w-[240px] text-[0.8rem]">
                  {selectedFollowUp.question}
                </span>
              </div>

              {/* Result card */}
              <div className={`overflow-hidden rounded-2xl border mb-4 ${u.border} shadow-sm transition-shadow hover:shadow-md`}>
                {/* Urgency header */}
                <div className={`flex items-center gap-2 border-b ${u.border} ${u.bg} px-4 py-2.5`}>
                  <span className={`h-2 w-2 rounded-full ${u.dot}`} />
                  <span className={`text-[0.65rem] font-bold uppercase tracking-widest ${u.text}`}>
                    {u.label}
                  </span>
                </div>

                <div className="px-4 py-4 space-y-4">
                  {/* Likely */}
                  <div>
                    <div className={`mb-1 text-[0.65rem] font-bold uppercase tracking-widest  opacity-60`}>
                      Likely
                    </div>
                    <div className={`text-sm font-semibold `}>
                      {selectedFollowUp.result.likely}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className={`h-px ${u.border} border-t`} />

                  {/* Next step */}
                  <div>
                    <div className={`mb-1 text-[0.65rem] font-bold uppercase tracking-widest  opacity-60`}>
                      Next step
                    </div>
                    <div className={`text-sm leading-relaxed `}>
                      {selectedFollowUp.result.nextStep}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reminder */}
              <div className="mt-3 text-[0.68rem] leading-relaxed text-sky-800">
                This guidance is for general awareness only. A healthcare provider is the only person who can give you a diagnosis.
              </div>

              <div className="flex items-center justify-between">
              {/* Navigation */}
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={backToFollowUps}
                  className="flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-sky-500 transition-colors hover:border-sky-300 hover:text-sky-800 hover:bg-sky-100"
                >
                  <svg viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 8H3M7 4L3 8l4 4" />
                  </svg>
                  Different description
                </button>
                <button
                  onClick={backToSymptoms}
                  className="flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-sky-500 transition-colors hover:border-sky-300 hover:text-sky-800 hover:bg-sky-100"
                >
                  <svg viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 8H3M7 4L3 8l4 4" />
                  </svg>
                  Different symptom
                </button>
              </div>
              <MdxBrandLogo className="h-12 w-auto text-sky-600/70" />
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}