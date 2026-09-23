import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { technologyCategories } from "@/data/technologies";
export function TechnologyStack() { return <section id="tecnologias" className="section bg-[#09101c]"><Container><SectionHeading eyebrow="Stack" title="Ferramentas que fazem parte da minha jornada." sticker="docker" /><div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{technologyCategories.map((category) => <article key={category.name} className="card p-6"><h3 className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">{category.name}</h3><div className="mt-5 flex flex-wrap gap-2">{category.technologies.map((technology) => <TechBadge key={technology}>{technology}</TechBadge>)}</div></article>)}</div></Container></section>; }
