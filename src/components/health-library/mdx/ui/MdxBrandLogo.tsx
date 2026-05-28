type Props = {
  /**
   * Tailwind class(es) controlling size.
   * @default "h-6 w-6"
   */
  className?: string;
};

/**
 * MdxBrandLogo — the A Dose of Health brand mark as an inline SVG.
 *
 * Inherits colour via `fill-current` so wrap it in any Tailwind text-colour
 * class to tint it. Size is controlled via `className`.
 *
 * Registration:
 * ```ts
 * import { MdxBrandLogo } from "@/components/mdx/MdxBrandLogo";
 * export const mdxComponents = { MdxBrandLogo };
 * ```
 *
 * Usage in MDX:
 * ```mdx
 * // Default size, inherits text colour from parent
 * <MdxBrandLogo />
 *
 * // Custom size + explicit colour
 * <MdxBrandLogo className="h-10 w-10 text-sky-400" />
 *
 * // Inline inside prose
 * The <MdxBrandLogo className="inline h-4 w-4 text-sky-300" /> team.
 * ```
 *
 * Usage in TSX:
 * ```tsx
 * <MdxBrandLogo className="h-5 w-5 text-sky-300" />
 * ```
 */
export function MdxBrandLogo({ className = "h-6 w-6" }: Props) {
  return (
    <svg
      viewBox="0 0 50.41 103.24"
      className={`fill-current ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M27.34,87.63v11.53h7.82s.65.35.73.42c1.18,1.04.82,3.07-.64,3.62l-19.98.04c-1.47-.47-1.96-2.34-.92-3.48.14-.15.76-.6.88-.6h7.82v-11.53c-4.73-.25-9.41-2.18-13.16-5.04C3.68,77.84.14,70.36,0,62.52V24.96c1.45-33.67,49.25-32.9,50.41,0v37.56s-.17,2.63-.17,2.63c-1.21,11.85-10.93,21.69-22.89,22.48ZM23.85,4.68C13.27,5.41,4.9,14.08,4.28,24.63c-.74,12.64.57,26,0,38.71,2.13,26.5,39.71,26.5,41.84,0-.57-12.72.74-26.07,0-38.71-.67-11.5-10.65-20.76-22.27-19.95Z" />
      <path d="M31.59,15.38c2.41-.31,3.76,1.27,3.97,3.52.67,7.01-.46,14.95.03,22.05-.31,2.16.37,5.69-2.6,6.3-2.48.5-6.37-.29-9.02.03-.97.12-1.72.87-2.01,1.78-.62,1.94-.57,9.46-.04,11.47.83,3.13,5.26,3.23,6.5.42,1.17-2.65-.54-7.33,1.17-9.37,1.87-2.24,5.62-1.17,6,1.72l-.04,17.75c-.52,2.45-3.51,3.45-5.48,1.93-1.69-1.31-1.02-3.04-1.47-4.78-.66-2.54-3.47-3.53-5.53-1.89-2.81,2.24-.11,6.45-2.81,8.39-2.03,1.46-4.96.37-5.43-2.13l.04-29.44c.38-1.44,1.49-2.46,3-2.6,2.42-.22,7.45.58,9.34-.55,2.23-1.34,1.66-5.15,1.63-7.44-.06-4.25-.63-9.83-.15-13.97.19-1.62,1.24-2.97,2.91-3.19Z" />
      <path d="M17.25,22.45c1.92-.39,4.03.64,4.31,2.69.16,1.19.18,5.89-.06,6.99-.7,3.28-6.18,3.26-6.66-.27-.17-1.25-.18-5.64.02-6.86.18-1.09,1.31-2.34,2.39-2.55Z" />
    </svg>
  );
}