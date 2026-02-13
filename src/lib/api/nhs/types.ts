// lib/types/nhs.ts

export type NHSSection = {
  name: string;
  description: string;
  url?: string;        // Add if returned by API for links
  hasPart?: NHSSection[];
};

export type WomensHealthTopic = {
  name: string;
  description: string;
  hasPart?: NHSSection[];
};
