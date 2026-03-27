import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Balancer from "react-wrap-balancer";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function MdxArticle({ children }: { children: ReactNode }) {
  return (
    <article className="rounded-2xl p-8 shadow-sm border border-slate-100">
      <div className={twMerge(
        "prose prose-slate max-w-none font-bricolage", // Sets base font
        
        // --- PARAGRAPH SPECIFIC ---
        "prose-p:font-normal",       // Force weight 400 (Regular)
        "prose-p:text-slate-600",    // Soften the color for readability
        "prose-p:leading-relaxed",   // Add breathing room between lines
        "prose-p:!text-lg",           // Slightly larger for "Health" content
        
        // --- HEADING SPECIFIC ---
        "prose-headings:font-extrabold", 
        "prose-headings:tracking-tight",
        "prose-headings:text-slate-900"
      )}>
        {children}
      </div>
    </article>
  );
}
