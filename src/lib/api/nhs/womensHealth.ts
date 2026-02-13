import { nhsFetch } from "./client";
import { WomensHealthTopic } from "./types";

export async function getWomensHealthHub() {
  return nhsFetch<WomensHealthTopic>("/womens-health");
}

export async function getWomensHealthTopic(slug: string) {
  return nhsFetch<WomensHealthTopic>(`/womens-health/${slug}`);
}
