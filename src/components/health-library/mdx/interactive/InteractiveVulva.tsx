"use client";

import { vulvaParts } from "@/data/anatomy/vulva";
import { useState } from "react";

export default function InteractiveVulva() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      
      {/* LEFT: SVG */}
      <div className="relative flex justify-center">
        <svg
          viewBox="0 0 300 600"
          className="w-full max-w-xs"
        >
          {/* Base shape */}
          <ellipse cx="150" cy="300" rx="90" ry="220" fill="#FDE2E4" />

          {/* Clitoris */}
          <circle
            cx="150"
            cy="120"
            r="10"
            fill={active === "clitoris" ? "#F472B6" : "#FBCFE8"}
            className="cursor-pointer transition"
            onClick={() => setActive("clitoris")}
          />

          {/* Labia Majora */}
          <ellipse
            cx="150"
            cy="300"
            rx="70"
            ry="180"
            fill={active === "labia-majora" ? "#FB7185" : "#FECACA"}
            className="cursor-pointer transition"
            onClick={() => setActive("labia-majora")}
          />

          {/* Labia Minora */}
          <ellipse
            cx="150"
            cy="300"
            rx="40"
            ry="140"
            fill={active === "labia-minora" ? "#F59E0B" : "#FED7AA"}
            className="cursor-pointer transition"
            onClick={() => setActive("labia-minora")}
          />

          {/* Urethral opening */}
          <circle
            cx="150"
            cy="260"
            r="6"
            fill={active === "urethral-opening" ? "#34D399" : "#BBF7D0"}
            className="cursor-pointer"
            onClick={() => setActive("urethral-opening")}
          />

          {/* Vaginal opening */}
          <circle
            cx="150"
            cy="320"
            r="10"
            fill={active === "vaginal-opening" ? "#60A5FA" : "#BFDBFE"}
            className="cursor-pointer"
            onClick={() => setActive("vaginal-opening")}
          />

          {/* Perineum */}
          <circle
            cx="150"
            cy="380"
            r="8"
            fill={active === "perineum" ? "#A78BFA" : "#DDD6FE"}
            className="cursor-pointer"
            onClick={() => setActive("perineum")}
          />
        </svg>
      </div>

      {/* RIGHT: LEGEND */}
      <div className="space-y-4">
        {vulvaParts.map((part) => {
          const isActive = active === part.id;

          return (
            <div
              key={part.id}
              onClick={() => setActive(part.id)}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                isActive ? "bg-gray-50 border-gray-300" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: part.color }}
                />
                <h3 className="font-medium">{part.label}</h3>
              </div>

              {isActive && (
                <p className="text-sm text-gray-600 mt-2">
                  {part.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}