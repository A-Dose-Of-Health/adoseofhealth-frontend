import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { twMerge } from "tailwind-merge";
import { mdxComponents } from "./mdx/index";

type Props = {
  source: string;
};

const MDX_OPTIONS = {
  parseFrontmatter: true,
  mdxOptions: {
    remarkPlugins: [
      remarkGfm as unknown as any,
      remarkSlug as unknown as any,
    ],
    rehypePlugins: [
      [
        rehypeAutolinkHeadings as unknown as any,
        {
          behavior: "wrap",
          properties: { className: ["anchor-link"] },
        },
      ] as any,
    ],
  },
};

export function MdxArticle({ source }: Props) {
  return (
    <article className="rounded-2xl p-8 shadow-sm border border-slate-100">
      <div
        className={twMerge(
          "prose prose-slate max-w-none font-bricolage",
          "prose-p:font-normal",
          "prose-p:text-slate-600",
          "prose-p:leading-relaxed",
          "prose-p:!text-lg",
          "prose-headings:font-extrabold",
          "prose-headings:tracking-tight",
          "prose-headings:text-slate-900",
        )}
      >
        <MDXRemote
          source={source}
          options={MDX_OPTIONS}
          components={mdxComponents}
        />
      </div>
    </article>
  );
}