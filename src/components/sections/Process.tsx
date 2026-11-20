import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { title: "Conversa", description: "Entendo seu negócio, o problema e o que você espera do projeto. Sem compromisso." },
  { title: "Proposta", description: "Você recebe escopo, prazo e valor por escrito, antes de qualquer pagamento." },
  { title: "Desenvolvimento", description: "Entregas parciais para você acompanhar e ajustar o rumo ao longo do caminho." },
  { title: "Publicação", description: "Coloco tudo no ar, configurado, testado e com você sabendo usar." },
  { title: "Suporte", description: "Acompanho os primeiros dias e sigo disponível para melhorias e manutenção." },
];

export function Process() {
  return <section id="processo" className="section"><Container>
    <SectionHeading eyebrow="Como trabalho" title="Um processo simples, sem surpresas." description="Você sabe o que vai receber, quando e por quanto — e acompanha cada etapa." sticker="aws" />
    <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{steps.map((step, index) => <li key={step.title} className="card p-5">
      <span className="text-xs font-bold text-accent">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
    </li>)}</ol>
  </Container></section>;
}
