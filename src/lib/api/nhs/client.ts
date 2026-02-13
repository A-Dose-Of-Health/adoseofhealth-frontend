"use server";

const NHS_BASE = "https://int.api.service.nhs.uk/nhs-website-content/"; 

console.log("NHS KEY:", process.env.NHS_API_KEY);


export async function nhsFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${NHS_BASE}${path}`, {
    method: "GET",
    headers: {
      "apikey": process.env.NHS_API_KEY!,
      "User-Agent": "adoseofhealth_integration_test",
    //   "Content-Type": "application/json",
    },
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error(`NHS API error: ${res.status}`);
  }

  const json = await res.json();

  // ✅ Log the raw response
  console.log(`NHS API response for ${path}:`, JSON.stringify(json, null, 2));

  return json as T;
}
