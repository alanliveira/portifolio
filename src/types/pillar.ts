import type { PillarId } from "@/types/project";

export interface Pillar {
  id: PillarId;
  number: string;
  title: string;
  description: string;
  technologies: string[];
  accent: "blue" | "violet" | "cyan" | "orange";
}
