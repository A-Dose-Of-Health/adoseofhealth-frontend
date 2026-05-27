import type { ReactNode } from "react";
import {
  Lightbulb,
  TriangleAlert,
  Siren,
  Sparkles,
  Info,
  Heart,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

type Variant = "info" | "tip" | "warning" | "danger" | "urgent" | "neutral";

type VariantConfig = {
  container: string;
  iconWrapper: string;
  titleColor: string;
  Icon: React.ElementType;
  defaultTitle: string;
};

const VARIANTS: Record<Variant, VariantConfig> = {
  info: {
    container: "bg-secondary/5 border-secondary/20",
    iconWrapper: "bg-secondary/10 text-secondary",
    titleColor: "text-secondary",
    Icon: Lightbulb,
    defaultTitle: "Key Point",
  },
  tip: {
    container: "bg-tertiary/10 border-tertiary/30",
    iconWrapper: "bg-tertiary/20 text-[#2ea88a]",
    titleColor: "text-[#1d7a63]",
    Icon: Sparkles,
    defaultTitle: "Tip",
  },
  warning: {
    container: "bg-amber-50 border-amber-200",
    iconWrapper: "bg-amber-100 text-amber-600",
    titleColor: "text-amber-700",
    Icon: TriangleAlert,
    defaultTitle: "Important",
  },
  danger: {
    container: "bg-red-50 border-red-200",
    iconWrapper: "bg-red-100 text-red-500",
    titleColor: "text-red-700",
    Icon: Siren,
    defaultTitle: "Warning",
  },
  urgent: {
    container: "bg-red-50 border-red-300",
    iconWrapper: "bg-red-200 text-red-600",
    titleColor: "text-red-800",
    Icon: Siren,
    defaultTitle: "Seek Urgent Care",
  },
  neutral: {
    container: "bg-orange-100/10 border-orange-300/50",
    iconWrapper: "bg-orange-300/30 text-orange-600",
    titleColor: "text-orange-700",
    Icon: Heart,
    defaultTitle: "Neutral Context",
  },
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

type Props = {
  /**
   * Visual style of the callout.
   * @default "info"
   */
  variant?: Variant;
  /**
   * Bold title shown next to the icon.
   * Falls back to the variant's default title if omitted.
   */
  title?: string;
  children: ReactNode;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Callout — styled block for surfacing important information in MDX articles.
 *
 * Server component — no client JS required.
 *
 * Usage in MDX:
 * ```mdx
 * <Callout variant="warning" title="Critical Warning">
 * Vaginal symptoms often overlap. **Self-diagnosis is unreliable.**
 * </Callout>
 * ```
 */
export function Callout({ variant = "info", title, children }: Props) {
  const { container, iconWrapper, titleColor, Icon, defaultTitle } =
    VARIANTS[variant];

  const displayTitle = title ?? defaultTitle;

  // Kenya variant gets a flag emoji prefix instead of a lucide icon
  const isKenya = variant === "neutral";

  return (
    <div
      className={`not-prose my-6 overflow-hidden rounded-2xl border ${container}`}
    >
      {/* Header row */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <span
          className={`flex size-7 shrink-0 items-center justify-center rounded-full ${iconWrapper}`}
        >
          <Icon className="size-3.5" strokeWidth={2.5} />
        </span>
        <p className={`text-sm font-bold uppercase tracking-wider ${titleColor}`}>
          {displayTitle}
        </p>
      </div>

      {/* Body — wrap in prose so children markdown renders correctly */}
      <div className="px-5 pb-5 text-sm leading-relaxed text-slate-600 [&>p]:mt-0 [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:mt-1 [&>ul]:pl-4 [&>ul>li]:mb-1 [&>strong]:font-semibold [&>strong]:text-slate-800">
        {children}
      </div>
    </div>
  );
}