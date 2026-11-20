import { Container } from "@/components/layout/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { services } from "@/data/services";

const accents = { blue: "border-blue-400/30 hover:border-blue-400/70", violet: "border-violet-400/30 hover:border-violet-400/70", cyan: "border-cyan-400/30 hover:border-cyan-400/70", orange: "border-orange-400/30 hover:border-orange-400/70" };

export function Services() {
  return <section id="servicos" className="section"><Container>
    <SectionHeading eyebrow="Serviços" title="Como posso ajudar seu negócio." description="Do site que traz clientes ao sistema que organiza sua operação. Você fala do problema; eu cuido da tecnologia." sticker="ruby" />
    <div className="mt-12 grid gap-4 md:grid-cols-2">{services.map((service) => <article key={service.id} className={`card flex flex-col border p-6 transition-colors ${accents[service.accent]}`}>
      <p className="text-sm font-medium text-slate-300">{service.problem}</p>
      <h3 className="mt-5 text-2xl font-semibold text-white">{service.title}</h3>
      <p className="mt-4 leading-7 text-muted">{service.description}</p>
      <ul className="mt-6 flex flex-wrap gap-2">{service.deliverables.map((item) => <li key={item}><TechBadge>{item}</TechBadge></li>)}</ul>
      <div className="mt-auto pt-8"><ArrowLink href="/#contato">Quero um orçamento</ArrowLink></div>
    </article>)}</div>
  </Container></section>;
}
