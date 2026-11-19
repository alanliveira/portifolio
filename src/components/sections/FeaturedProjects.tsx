import { Container } from "@/components/layout/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function FeaturedProjects() {
  return <section id="projetos" className="section bg-[#09101c]"><Container>
    <SectionHeading eyebrow="Projetos" title="Projetos que você pode ver funcionando." description="Do site de uma empresa real a sistemas em produção e a um projeto antigo que voltou à vida na web moderna." sticker="node" />
    <div className="mt-12 grid gap-5 md:grid-cols-2">{projects.filter((project) => project.featured).map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
    <div className="mt-10"><ArrowLink href="/projects">Ver todos os projetos</ArrowLink></div>
  </Container></section>;
}
