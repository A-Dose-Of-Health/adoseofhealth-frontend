import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /**
   * Optional caption rendered below the image.
   */
  caption?: string;
  /**
   * Width of the image in pixels.
   * @default 800
   */
  width?: number;
  /**
   * Height of the image in pixels.
   * @default 450
   */
  height?: number;
  /**
   * Fill the full width of the article column.
   * @default true
   */
  fullWidth?: boolean;
};

/**
 * MdxImage — optimised Next.js Image for use inside MDX files.
 *
 * Replaces the bare `<img>` tag registered in mdxComponents so every image
 * in MDX automatically gets Next.js image optimisation, lazy loading and
 * correct sizing — with zero extra work in the MDX file.
 *
 * Server component — no client JS required.
 *
 * Two ways to use it in MDX:
 *
 * 1. Standard markdown image syntax (handled automatically via the `img`
 *    key in mdxComponents — see registry):
 *    ```mdx
 *    ![Alt text describing the image](/images/health-library/anatomy-diagram.jpg)
 *    ```
 *
 * 2. Component syntax when you need a caption or custom dimensions:
 *    ```mdx
 *    <MdxImage
 *      src="/images/health-library/anatomy-diagram.jpg"
 *      alt="Diagram of the female reproductive system"
 *      caption="Source: WHO Guidelines 2025"
 *      width={900}
 *      height={500}
 *    />
 *    ```
 *
 * IMPORTANT — for external image domains (e.g. a CMS or CDN), add the
 * hostname to `images.remotePatterns` in next.config.ts first:
 * ```ts
 * images: {
 *   remotePatterns: [{ protocol: "https", hostname: "cdn.adoseofhealth.com" }]
 * }
 * ```
 */
export function MdxImage({
  src,
  alt,
  caption,
  width = 800,
  height = 450,
  fullWidth = true,
}: Props) {
  return (
    <figure className={`not-prose my-8 ${fullWidth ? "w-full" : "mx-auto max-w-lg"}`}>
      <div className="overflow-hidden rounded-xl border border-slate-100">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}