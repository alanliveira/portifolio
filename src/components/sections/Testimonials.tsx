import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  if (testimonials.length === 0) return null;
  return <section id="depoimentos" className="section"><Container>
    <SectionHeading eyebrow="Depoimentos" title="Quem já trabalhou comigo." sticker="white" />
    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{testimonials.map((item) => <figure key={item.name} className="card p-6">
      <blockquote className="leading-7 text-slate-200">“{item.quote}”</blockquote>
      <figcaption className="mt-5 text-sm"><span className="block font-semibold text-white">{item.name}</span><span className="text-muted">{item.role}</span></figcaption>
    </figure>)}</div>
  </Container></section>;
}
