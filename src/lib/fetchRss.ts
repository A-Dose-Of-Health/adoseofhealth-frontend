import Parser from "rss-parser";

type CustomItem = {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  content?: string;
  contentEncoded?: string;
  mediaContent?: { $: { url: string } }[];
  mediaThumbnail?: { $: { url: string } }[];
  enclosure?: { url: string }[];
  imageUrl?: string;
};

const parser: Parser<CustomItem> = new Parser({
  customFields: {
    item: [
      ["media:content", "mediaContent", { keepArray: true }],
      ["media:thumbnail", "mediaThumbnail", { keepArray: true }],
      ["content:encoded", "contentEncoded"],
      ["enclosure", "enclosure", { keepArray: true }],
    ],
  },
});

// helper to extract first <img src="..."> from HTML
function extractImageFromHtml(html?: string): string | undefined {
  if (!html) return undefined;
  const match = html.match(/<img[^>]+src="([^">]+)"/i);
  return match?.[1];
}

export async function fetchLancetFeed(): Promise<CustomItem[]> {
  try {
    const feed = await parser.parseURL(
      "https://www.afro.who.int/rss/featured-news.xml"
    );

    return feed.items.map((item) => {
      let imageUrl: string | undefined;

      // 1. media:content
      if (Array.isArray(item.mediaContent) && item.mediaContent[0]?.["$"]?.url) {
        imageUrl = item.mediaContent[0]["$"].url;
      }
      // 2. media:thumbnail
      else if (Array.isArray(item.mediaThumbnail) && item.mediaThumbnail[0]?.["$"]?.url) {
        imageUrl = item.mediaThumbnail[0]["$"].url;
      }
      // 3. enclosure
      else if (Array.isArray(item.enclosure) && item.enclosure[0]?.url) {
        imageUrl = item.enclosure[0].url;
      }
      // 4. content:encoded HTML
      else {
        imageUrl =
          extractImageFromHtml(item.contentEncoded) ||
          extractImageFromHtml(item.contentSnippet) ||
          extractImageFromHtml(item.content);
      }

      return {
        title: item.title || "Untitled",
        link: item.link || "#",
        pubDate: item.pubDate || "",
        contentSnippet: item.contentSnippet || "",
        imageUrl,
      };
    });
  } catch (err) {
    console.error("Error fetching RSS feed:", err);
    return [];
  }
}
