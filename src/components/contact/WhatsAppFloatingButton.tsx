"use client";

import { whatsappUrl } from "@/data/contact";
import { trackEvent } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function WhatsAppFloatingButton() {
  if (!whatsappUrl) return null;
  return <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Falar com Alan no WhatsApp" onClick={() => trackEvent("whatsapp_click", { location: "floating_button" })} className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-[#062814] shadow-[0_12px_30px_rgba(37,211,102,.35)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a99fff]"><WhatsAppIcon className="h-7 w-7" /></a>;
}
