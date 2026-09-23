import projectData from "@/data/projects.json";
import type { Project } from "@/types/project";

export const projects = projectData.projects as Project[];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
