"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Link2,
  Check,
  Share2,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  Pin
} from "lucide-react";
import type { RelatedArticle } from "@/content/health-library/loaders";

type Props = {
  articleTitle: string;
  articleUrl: string;
  relatedArticles: RelatedArticle[];
};

function ShareSection({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: "X / Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      label: "Email",
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=I thought you might find this helpful: ${encodedUrl}`,
    },
  ];

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled — no-op
      }
      return;
    }
    // Fallback: copy to clipboard
    handleCopy();
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked — silently ignore
    }
  }

  return (
    <div className="rounded-2xl border p-4 space-y-3">
      <p className="text-base font-semibold">Share this article</p>

      {/* Native share / copy link */}
      <div className="flex gap-2">
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-white transition hover:bg-primary/90"
        >
          <Share2 className="size-3.5" />
          Share
        </button>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition hover:bg-slate-50"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-green-600" />
              <span className="text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="size-3.5" />
              Copy link
            </>
          )}
        </button>
      </div>

      {/* Social links */}
      <div className="flex flex-wrap gap-2 pt-1 border-t">
        {shareLinks.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label}`}
            className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <Icon className="size-3.5" />
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

function RelatedArticlesSection({ articles }: { articles: RelatedArticle[] }) {
  if (!articles.length) return null;

  return (
    <div className="rounded-2xl border p-4 space-y-3">
      <p className="text-base font-semibold">Related articles</p>
      <ul className="space-y-3">
        {articles.map((article) => (
          <li key={article.route}>
            <Link
              href={article.route}
              className="group block rounded-xl border border-transparent p-3 transition hover:border-slate-200 hover:bg-slate-50"
            >
              {/* Pinned indicator — only visible to editors, subtle enough not to confuse readers */}
              {article.pinned && (
                <span className="mb-1 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-primary/70">
                  <Pin className="size-2.5" />
                  Curated
                </span>
              )}
              <p className="text-sm font-medium text-slate-800 group-hover:text-primary leading-snug line-clamp-2">
                {article.title}
              </p>
              <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {article.summary}
              </p>
              <p className="mt-1.5 text-[11px] text-slate-400">
                Updated {article.updatedAt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ArticleRightSidebar({
  articleTitle,
  articleUrl,
  relatedArticles,
}: Props) {
  return (
    <aside aria-label="Article actions and related content" className="space-y-4">
      <ShareSection title={articleTitle} url={articleUrl} />
      <RelatedArticlesSection articles={relatedArticles} />
    </aside>
  );
}
