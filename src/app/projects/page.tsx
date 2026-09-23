import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
export const metadata = { title: "Projetos", description: "Cases de desenvolvimento web, inteligência artificial, games, automação e deploy criados por Alan Oliveira.", alternates: { canonical: "/projects" } };
export default function ProjectsPage() { return <><Navbar /><main id="conteudo-principal" className="section"><Container><SectionHeading eyebrow="Portfólio" title="Projetos e experimentos" description="Cases organizados por área de atuação e identificados de acordo com seu estágio." /><div className="mt-12 grid gap-5 md:grid-cols-2">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></Container></main><Footer /></>; }
