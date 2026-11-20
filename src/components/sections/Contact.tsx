import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { CubeSticker } from "@/components/ui/CubeSticker";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { calendarUrl, whatsappUrl } from "@/data/contact";

const stickerColors = ["ruby", "node", "aws", "python", "unity", "docker", "yellow"] as const;

export function Contact() {
  return <section id="contato" className="section"><Container><div className="card relative overflow-hidden px-6 py-12 sm:px-12 sm:py-16"><div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" /><div className="relative grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
    <div>
      <div aria-hidden="true" className="-ml-2 flex -space-x-4 sm:-space-x-3">{stickerColors.map((color) => <span key={color} className="scale-75 sm:scale-90"><CubeSticker color={color} /></span>)}</div>
      <p className="eyebrow mt-1">Contato</p>
      <h2 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl">Conte sobre o seu projeto.</h2>
      <p className="mt-6 text-lg leading-8 text-muted">Respondo em até 24 horas com os próximos passos. A primeira conversa é gratuita e sem compromisso.</p>
      <ul className="mt-6 space-y-2 text-slate-300">{["Site ou landing page", "Sistema web ou MVP", "Automação de processos", "Manutenção de um sistema existente"].map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="text-[#65d9d2]">✓</span>{item}</li>)}</ul>
      {whatsappUrl || calendarUrl ? <div className="mt-8 flex flex-wrap gap-3">
        {whatsappUrl ? <TrackedLink href={whatsappUrl} event="whatsapp_click" location="contact" variant="whatsapp"><WhatsAppIcon />Falar no WhatsApp</TrackedLink> : null}
        {calendarUrl ? <TrackedLink href={calendarUrl} event="schedule_click" location="contact" variant="secondary">Agendar uma conversa</TrackedLink> : null}
      </div> : null}
      <p className="mt-8 text-sm text-slate-400">{whatsappUrl || calendarUrl ? "Prefere escrever com calma? Use o formulário." : "Preencha o formulário e eu retorno pelo canal que você preferir."}</p>
    </div>
    <ContactForm />
  </div></div></Container></section>;
}
