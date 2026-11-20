import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ContactActions } from "@/components/contact/ContactActions";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export const metadata = { title: "Projetos", description: "Sites, sistemas web, landing pages e jogos desenvolvidos por Alan Oliveira — com links para ver cada projeto funcionando.", alternates: { canonical: "/projects" } };

export default function ProjectsPage() {
  return <><Navbar /><main id="conteudo-principal" className="section"><Container>
    <SectionHeading eyebrow="Portfólio" title="Projetos entregues" description="Sites para clientes, sistemas em produção, landing pages e jogos publicados. Clique para ver cada um funcionando." />
    <div className="mt-12 grid gap-5 md:grid-cols-2">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
    <div className="card mt-16 px-6 py-10 sm:px-10"><h2 className="text-pretty text-3xl font-semibold tracking-tight text-white">Seu projeto pode ser o próximo.</h2><p className="mt-4 max-w-2xl leading-7 text-muted">Conte o que você precisa e eu respondo com os próximos passos.</p><ContactActions location="projects_page" className="mt-8" /></div>
  </Container></main><Footer /></>;
}
