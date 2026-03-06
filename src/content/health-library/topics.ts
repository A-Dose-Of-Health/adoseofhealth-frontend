export type HealthTopicConfig = {
  slug: string;            // URL slug: /health-library/[slug]
  title: string;           // Display label
  description: string;     // Hero/SEO copy
  icon?: "heart" | "brain" | "sparkles" | "stethoscope";
  order?: number;          // Optional sorting
  // Optional "sections" to group subtopics on the topic page
  sections?: Array<{
    title: string;
    subtopics: string[];   // subtopic slugs
  }>;
};

export const HEALTH_TOPICS: HealthTopicConfig[] = [
  {
    slug: "womens-health",
    title: "Women’s Health",
    description:
      "Trusted guidance across reproductive health, pregnancy, contraception, menopause, and more.",
    icon: "heart",
    order: 1,
    sections: [
      { title: "Reproductive Health", subtopics: ["pregnancy"] },
      { title: "Other", subtopics: [] },
    ],
  },
  {
    slug: "mental-health",
    title: "Mental Health",
    description:
      "Understand common conditions, find self-care steps, and learn when to seek support.",
    icon: "brain",
    order: 2,
    sections: [{ title: "Common Topics", subtopics: ["anxiety"] }],
  },
];