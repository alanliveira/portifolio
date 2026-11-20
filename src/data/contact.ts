import { siteConfig } from "@/data/site";

const whatsappDigits = siteConfig.whatsapp.replace(/\D/g, "");

/** Link do WhatsApp com mensagem pré-preenchida, ou null enquanto o número não estiver configurado em profile.json. */
export const whatsappUrl = whatsappDigits ? `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(siteConfig.whatsappMessage)}` : null;

/** Link de agendamento (Cal.com, Calendly...), ou null enquanto não estiver configurado em profile.json. */
export const calendarUrl = siteConfig.calendarUrl || null;

export const contactFormAnchor = "/#formulario-contato";
