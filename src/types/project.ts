export type ProjectKind = "producao" | "conceito" | "prototipo" | "experimento";
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
  caseStudy: {
    context: string;
    problem: string;
    objective: string;
    role: string;
    architecture: string;
    technicalDecisions: string[];
    learnings: string;
    gallery: string[];
  };
}
