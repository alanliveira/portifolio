import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
export function FeaturedProjects() { return <section id="projetos" className="section bg-[#09101c]"><Container><SectionHeading eyebrow="Projetos" title="Projetos em destaque" description="Projetos que representam diferentes partes da minha experiência e mostram como transformo problemas em soluções." sticker="node" /><div className="mt-12 grid gap-5 md:grid-cols-2">{projects.filter((project) => project.featured).map((project) => <ProjectCard key={project.slug} project={project} />)}</div></Container></section>; }
