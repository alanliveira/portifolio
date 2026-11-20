import type { ProjectKind } from "@/types/project";

export const projectKindLabels: Record<ProjectKind, string> = {
  cliente: "Projeto para cliente",
  producao: "Sistema em produção",
  publicado: "Publicado",
  academico: "Projeto autoral",
};
