import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reasons = [
  "Experiência com sistemas reais em produção, não só projetos de estudo.",
  "Cuido de tudo: layout, backend, banco de dados, integrações e deploy.",
  "Anos ensinando tecnologia — explico cada decisão sem \"tecniquês\".",
];

export function About() {
  return <section id="sobre" className="section"><Container className="grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-surface"><Image src="/images/alan-oliveira.jpg" alt="Foto de Alan Oliveira, desenvolvedor Full Stack" fill sizes="(min-width: 1024px) 384px, 90vw" className="object-cover" /></div>
    <div>
      <SectionHeading eyebrow="Sobre mim" title="Código é o meio. Resolver o seu problema é o objetivo." sticker="python" />
      <div className="mt-6 max-w-2xl space-y-5 pl-[72px] leading-7 text-muted sm:pl-[84px]">
        <p>Sou desenvolvedor Full Stack e comecei na tecnologia pela educação e pelo desenvolvimento de jogos. Isso me ensinou a pensar primeiro em quem vai usar a solução — e só depois no código.</p>
        <p>Hoje desenvolvo sites, sistemas web e automações, atuando do backend ao frontend, de bancos de dados a infraestrutura em cloud.</p>
        <p className="font-semibold text-white">Por que trabalhar comigo:</p>
        <ul className="space-y-3">{reasons.map((reason) => <li key={reason} className="flex gap-3"><span aria-hidden="true" className="text-[#65d9d2]">✓</span><span>{reason}</span></li>)}</ul>
      </div>
    </div>
  </Container></section>;
}
