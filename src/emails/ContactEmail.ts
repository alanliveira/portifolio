import type { ContactInput } from "@/lib/validation/contact";

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;" })[character] ?? character);

export function contactEmail({ name, email, subject, company, message, utmSource, wantsWhatsapp, whatsapp }: ContactInput) {
  const title = subject || "Sem assunto";
  const companyLine = company ? `Empresa / projeto: ${company}\n` : "";
  const sourceLine = utmSource ? `UTM source: ${utmSource}\n` : "";
  const whatsappLine = wantsWhatsapp && whatsapp ? `WhatsApp: ${whatsapp}\n` : "";
  const text = `Novo contato pelo portfólio\n\nNome: ${name}\nEmail: ${email}\nAssunto: ${title}\n${companyLine}${whatsappLine}${sourceLine}\nMensagem:\n${message}`;

  return {
    text,
    html: `<main style="font-family:Arial,sans-serif;color:#172033;line-height:1.6"><h1 style="font-size:20px">Novo contato pelo portfólio</h1><p><strong>Nome:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}<br><strong>Assunto:</strong> ${escapeHtml(title)}${company ? `<br><strong>Empresa / projeto:</strong> ${escapeHtml(company)}` : ""}${wantsWhatsapp && whatsapp ? `<br><strong>WhatsApp:</strong> ${escapeHtml(whatsapp)}` : ""}${utmSource ? `<br><strong>UTM source:</strong> ${escapeHtml(utmSource)}` : ""}</p><p><strong>Mensagem:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p></main>`,
  };
}
