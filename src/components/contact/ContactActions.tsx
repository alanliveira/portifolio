import { calendarUrl, contactFormAnchor, whatsappUrl } from "@/data/contact";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/** CTAs principais: WhatsApp e agendamento quando configurados; caso contrário, leva ao formulário. */
export function ContactActions({ location, className = "" }: { location: string; className?: string }) {
  return <div className={`flex flex-wrap gap-3 ${className}`}>
    {whatsappUrl ? <TrackedLink href={whatsappUrl} event="whatsapp_click" location={location} variant="whatsapp"><WhatsAppIcon />Falar no WhatsApp</TrackedLink> : <TrackedLink href={contactFormAnchor} event="contact_cta_click" location={location}>Conte seu projeto</TrackedLink>}
    {calendarUrl ? <TrackedLink href={calendarUrl} event="schedule_click" location={location} variant="secondary">Agendar uma conversa</TrackedLink> : <TrackedLink href="/#projetos" event="projects_cta_click" location={location} variant="secondary">Ver projetos entregues</TrackedLink>}
  </div>;
}
