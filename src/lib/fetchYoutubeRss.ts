import Parser from "rss-parser";

type YouTubeRSSItem = {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
};

const parser = new Parser();

export async function fetchYouTubeRss(channelId: string): Promise<YouTubeRSSItem[]> {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const feed = await parser.parseURL(url);

  return feed.items.map((item) => {
    // Extract videoId from link
    let videoId = "";
    if (item.link) {
      const match = item.link.match(/v=([^&]+)/);
      if (match) videoId = match[1];
    }

    return {
      id: videoId,
      title: item.title ?? "Untitled",
      link: item.link ?? "#",
      pubDate: item.pubDate ?? "",
      thumbnail: videoId
        ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
        : "/placeholder.jpg", // fallback
    };
  });
}
