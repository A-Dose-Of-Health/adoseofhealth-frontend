import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import {
  getArticleBySlugs,
  getHealthLibraryIndex,
} from "@/content/health-library/loaders";

export { generateStaticParams } from "./page";
export const runtime = "nodejs";
export const alt = "Article preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ topic: string; subtopic: string; article: string }>;
};

// Reads a font from public/fonts/ — returns null if file doesn't exist yet
// so the image always renders even before fonts are downloaded.
function tryReadFont(filename: string): Buffer | null {
  try {
    return fs.readFileSync(path.join(process.cwd(), "public", "fonts", filename));
  } catch {
    return null;
  }
}

export default async function OgImage({ params }: Props) {
  const { topic, subtopic, article } = await params;

  const item = getArticleBySlugs(topic, subtopic, article);
  const idx = getHealthLibraryIndex();

  const topicTitle =
    idx.topics.find((t) => t.slug === topic)?.title ?? topic;
  const subtopicTitle =
    (idx.subtopicsByTopic[topic] ?? []).find((s) => s.slug === subtopic)
      ?.title ?? subtopic;

  const title = item?.frontmatter.title ?? "Health Library";
  const summary = item?.frontmatter.summary ?? "";
  const updatedAt = item?.frontmatter.updatedAt ?? "";
  const formats = item?.frontmatter.formats ?? [];

  // Load fonts from public/fonts/ — TTF format required by ImageResponse.
  // Download instructions are in the comment below.
  //
  // 1. Go to https://fonts.google.com/specimen/Inter
  // 2. Click "Download family"
  // 3. Extract Inter-Bold.ttf and Inter-Regular.ttf
  // 4. Place them at: public/fonts/Inter-Bold.ttf and public/fonts/Inter-Regular.ttf
  //
  // Until the files are present the image renders with a system sans-serif.
  const bricolageExtraBold = tryReadFont("BricolageGrotesque-ExtraBold.ttf");
  const bricolageLight = tryReadFont("BricolageGrotesque-Light.ttf");

  const interBold = tryReadFont("Inter-Bold.ttf");
  const interRegular = tryReadFont("Inter-Regular.ttf");

  const fontConfig = [
    ...(interBold ? [{ name: "Inter", data: interBold, weight: 700 as const }] : []),
    ...(interRegular ? [{ name: "Inter", data: interRegular, weight: 400 as const }] : []),

    ...(bricolageExtraBold ? [{ name: "BricolageGrotesque", data: bricolageExtraBold, weight: 800 as const }] : []),
    ...(bricolageLight ? [{ name: "BricolageGrotesque", data: bricolageLight, weight: 300 as const }] : []),
  ];

  const fontFamily = fontConfig.length > 0 ? "Inter" : "sans-serif";

  // Brand colours
  const CREAM = "#FEFBF4";
  const TEAL = "#1E444C";
  const TEAL_LIGHT = "#2a5c66";
  const MUTED = "#6B7280";
  const ACCENT = "#e8f4f0";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          backgroundColor: CREAM,
          fontFamily,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: `radial-gradient(circle at center, ${TEAL}, transparent)`,
            opacity: 0.08,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -160,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle at center, #ef4444, transparent)",
            opacity: 0.06,
          }}
        />

        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 8,
            backgroundColor: TEAL,
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "56px 80px 56px 96px",
          }}
        >
          {/* Top: breadcrumb + format pills */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: ACCENT,
                border: `1px solid ${TEAL}22`,
                borderRadius: 999,
                padding: "8px 18px",
              }}
            >
              <span style={{ fontSize: 15, color: TEAL, fontWeight: 600 }}>
                {topicTitle}
              </span>
              <span style={{ fontSize: 13, color: MUTED }}>›</span>
              <span style={{ fontSize: 15, color: TEAL_LIGHT, fontWeight: 400 }}>
                {subtopicTitle}
              </span>
            </div>

            {formats.map((f) => (
              <div
                key={f}
                style={{
                  backgroundColor: "#f3f4f6",
                  border: "1px solid #e5e7eb",
                  borderRadius: 999,
                  padding: "8px 14px",
                  fontSize: 13,
                  color: MUTED,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {f}
              </div>
            ))}
          </div>

          {/* Middle: title + summary */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                fontSize: title.length > 40 ? 52 : 64,
                fontFamily: "BricolageGrotesque",
                fontWeight: 800,
                color: TEAL,
                lineHeight: 1.1,
                letterSpacing: -1.5,
                maxWidth: 900,
              }}
            >
              {title}
            </div>

            {summary && (
              <div
                style={{
                  fontSize: 22,
                  fontFamily: "BricolageGrotesque",
                  fontWeight: 300,
                  color: MUTED,
                  lineHeight: 1.5,
                  maxWidth: 820,
                }}
              >
                {summary.length > 140 ? summary.slice(0, 140) + "…" : summary}
              </div>
            )}
          </div>

          {/* Bottom: site name + date */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: TEAL,
                }}
              />
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: TEAL,
                  letterSpacing: -0.3,
                }}
              >
                A Dose of Health
              </span>
              <span style={{ fontSize: 14, color: "#9CA3AF", marginLeft: 4 }}>
                · Health Library
              </span>
            </div>

            {updatedAt && (
              <span style={{ fontSize: 14, color: "#9CA3AF" }}>
                Updated {updatedAt}
              </span>
            )}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontConfig.length > 0 ? { fonts: fontConfig } : {}),
    }
  );
}
