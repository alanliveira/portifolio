import "server-only";
import { Resend } from "resend";
import { contactEmail } from "@/emails/ContactEmail";
import type { ContactInput } from "@/lib/validation/contact";

export async function sendContactEmail(contact: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) return false;

  const email = contactEmail(contact);
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: contact.email,
    subject: `Novo contato pelo portfólio - ${contact.name}`,
    ...email,
  }, { idempotencyKey: `portfolio-contact/${contact.submissionId}` });

  return !error;
}
