import { z } from "zod";

export const HealthFormats = z.enum(["text", "audio", "video"]);

export const HealthArticleFrontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  topic: z.string().min(1),     // e.g. "womens-health"
  subtopic: z.string().min(1),  // e.g. "pregnancy"
  slug: z.string().min(1),      // e.g. "prenatal-care"
  updatedAt: z.string().min(4), // ISO date string recommended
  formats: z.array(HealthFormats).min(1),

  // Optional metadata
  lifeStages: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  readingMinutes: z.number().int().positive().optional(),
  relatedSlugs: z.array(z.string()).optional()
});

export type HealthArticleFrontmatter = z.infer<
  typeof HealthArticleFrontmatterSchema
>;

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type HealthArticleIndexItem = {
  filePath: string;
  route: string;
  frontmatter: HealthArticleFrontmatter;
  toc: ReadonlyArray<TocItem>;
};