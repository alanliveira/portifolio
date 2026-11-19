import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ContactActions } from "@/components/contact/ContactActions";
import { TechBadge } from "@/components/ui/TechBadge";
import { projectKindLabels } from "@/data/projectLabels";
import { getProjectBySlug, projects } from "@/data/projects";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { return params.then(({ slug }) => { const project = getProjectBySlug(slug); return project ? { title: project.title, description: project.description, alternates: { canonical: project.href }, openGraph: { type: "article" as const, url: project.href, title: project.title, description: project.description, images: [{ url: project.image, alt: `Tela do projeto ${project.title}` }] } } : { title: "Projeto" }; }); }

function CaseBlock({ title, content }: { title: string; content: string }) { return content ? <div><h2 className="text-2xl font-semibold text-white">{title}</h2><p className="mt-4 leading-8 text-muted">{content}</p></div> : null; }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const { caseStudy } = project;
  return <><Navbar /><main id="conteudo-principal">
    <section className="section"><Container>
      <Link href="/projects" className="text-sm text-slate-300 hover:text-white">← Todos os projetos</Link>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="eyebrow">{project.category} · {projectKindLabels[project.kind]}</p>
          <h1 className="mt-5 text-pretty text-4xl font-semibold tracking-tight text-white sm:text-6xl">{project.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{project.description}</p>
          <div className="mt-7 flex flex-wrap gap-2">{project.technologies.map((technology) => <TechBadge key={technology}>{technology}</TechBadge>)}</div>
          {project.liveUrl || project.repoUrl ? <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-[#6f61df]">{project.liveLabel ?? "Ver ao vivo"}<span aria-hidden="true">↗</span></a> : null}
            {project.repoUrl ? <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-white/3 px-5 text-sm font-semibold text-foreground transition-colors hover:border-[#6254d6] hover:bg-white/7">Ver código<span aria-hidden="true">↗</span></a> : null}
          </div> : null}
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-surface"><Image src={project.image} alt={`Tela do projeto ${project.title}`} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" priority /></div>
      </div>
    </Container></section>
    <section className="section bg-[#09101c]"><Container className="max-w-4xl"><div className="grid gap-10">
      <CaseBlock title="O desafio" content={caseStudy.challenge} />
      <CaseBlock title="A solução" content={caseStudy.solution} />
      <CaseBlock title="Meu papel" content={caseStudy.role} />
      {caseStudy.highlights.length > 0 ? <div><h2 className="text-2xl font-semibold text-white">Destaques</h2><ul className="mt-5 space-y-3 text-muted">{caseStudy.highlights.map((item) => <li key={item} className="border-l border-accent pl-4 leading-7">{item}</li>)}</ul></div> : null}
      <CaseBlock title="Resultado" content={caseStudy.result} />
      {caseStudy.gallery.length > 0 ? <div><h2 className="text-2xl font-semibold text-white">Galeria</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{caseStudy.gallery.map((src) => <div key={src} className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10"><Image src={src} alt={`Imagem do projeto ${project.title}`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" /></div>)}</div></div> : null}
    </div></Container></section>
    <section className="section"><Container><div className="card px-6 py-10 sm:px-10">
      <p className="eyebrow">Próximo projeto</p>
      <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-white sm:text-4xl">Precisa de algo parecido?</h2>
      <p className="mt-4 max-w-2xl leading-7 text-muted">Conte o que você precisa e eu respondo com os próximos passos.</p>
      <ContactActions location={`case_${project.slug}`} className="mt-8" />
    </div></Container></section>
  </main><Footer /></>;
}
