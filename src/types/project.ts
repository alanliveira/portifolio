export type ProjectKind = "cliente" | "producao" | "publicado" | "academico";
export type PillarId = "web" | "games" | "ai" | "deploy";

export interface Project {
  slug: string;
  pillar: PillarId;
  kind: ProjectKind;
  category: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  href: string;
  featured: boolean;
  liveUrl?: string;
  liveLabel?: string;
  repoUrl?: string;
  caseStudy: {
    challenge: string;
    solution: string;
    role: string;
    highlights: string[];
    result: string;
    gallery: string[];
  };
}
