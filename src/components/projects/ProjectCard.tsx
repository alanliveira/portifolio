import Image from "next/image";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Badge } from "@/components/ui/Badge";
import { TechBadge } from "@/components/ui/TechBadge";
import { projectKindLabels } from "@/data/projectLabels";
import type { Project } from "@/types/project";

export function ProjectCard({ project }: { project: Project }) {
  return <article className="card group flex flex-col overflow-hidden">
    <div className="relative aspect-[16/9] overflow-hidden border-b border-white/8 bg-[#111a2b]"><Image src={project.image} alt={`Tela do projeto ${project.title}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" /><div className="absolute inset-0 bg-gradient-to-t from-[#0a1020]/50 to-transparent" /></div>
    <div className="flex flex-1 flex-col p-6">
      <div className="flex flex-wrap gap-2"><Badge>{project.category}</Badge><Badge>{projectKindLabels[project.kind]}</Badge></div>
      <h3 className="mt-5 text-xl font-semibold text-white">{project.title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">{project.technologies.slice(0, 5).map((technology) => <TechBadge key={technology}>{technology}</TechBadge>)}</div>
      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-6"><ArrowLink href={project.href}>Ver case</ArrowLink>{project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#65d9d2] transition-colors hover:text-white">{project.liveLabel ?? "Ver ao vivo"}<span aria-hidden="true">↗</span></a> : null}</div>
    </div>
  </article>;
}
