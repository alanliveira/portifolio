import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq } from "@/data/faq";

export function Faq() {
  return <section id="faq" className="section bg-[#09101c]"><Container className="max-w-4xl">
    <SectionHeading eyebrow="Dúvidas frequentes" title="Antes de conversarmos." sticker="yellow" />
    <div className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10">{faq.map((item) => <details key={item.question} className="group px-5 py-4 sm:px-6">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white [&::-webkit-details-marker]:hidden">{item.question}<span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">+</span></summary>
      <p className="mt-3 leading-7 text-muted">{item.answer}</p>
    </details>)}</div>
  </Container></section>;
}
