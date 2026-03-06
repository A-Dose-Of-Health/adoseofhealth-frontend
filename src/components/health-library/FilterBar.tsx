"use client";

import * as React from "react";

type Props = {
  query: string;
  onQueryChange: (v: string) => void;

  format?: string;
  onFormatChange?: (v: string) => void;

  formats?: string[]; // e.g. ["all","text","audio","video"]
};

export function FilterBar({
  query,
  onQueryChange,
  format = "all",
  onFormatChange,
  formats = ["all", "text", "audio", "video"],
}: Props) {
  return (
    <section aria-label="Filters" className="flex flex-col gap-3 md:flex-row md:items-center">
      <label className="sr-only" htmlFor="hl-search">
        Search health library
      </label>
      <input
        id="hl-search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search topics and resources..."
        className="w-full md:w-[420px] rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-black/10"
      />

      {onFormatChange ? (
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600" htmlFor="hl-format">
            Format
          </label>
          <select
            id="hl-format"
            value={format}
            onChange={(e) => onFormatChange(e.target.value)}
            className="rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
          >
            {formats.map((f) => (
              <option key={f} value={f}>
                {f === "all" ? "All" : f[0].toUpperCase() + f.slice(1)}
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </section>
  );
}