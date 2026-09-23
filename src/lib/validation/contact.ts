import { z } from "zod";

const normalizeLine = (value: string) => value.replace(/\s+/g, " ").trim();
const normalizeMessage = (value: string) => value.replace(/\r\n/g, "\n").split("\n").map(normalizeLine).filter(Boolean).join("\n\n");

export const contactSchema = z.object({
  name: z.string().transform(normalizeLine).pipe(z.string().min(2, "Informe seu nome.").max(100, "Use no máximo 100 caracteres.")),
  email: z.string().transform(normalizeLine).pipe(z.string().email("Informe um email válido.").max(254, "Informe um email válido.")),
  subject: z.string().optional().default("").transform(normalizeLine).pipe(z.string().max(140, "Use no máximo 140 caracteres.")),
  company: z.string().optional().default("").transform(normalizeLine).pipe(z.string().max(100, "Use no máximo 100 caracteres.")),
  message: z.string().transform(normalizeMessage).pipe(z.string().min(10, "Escreva uma mensagem com pelo menos 10 caracteres.").max(5000, "Use no máximo 5.000 caracteres.")),
  utmSource: z.string().optional().default("").transform(normalizeLine).pipe(z.string().max(100)),
  wantsWhatsapp: z.boolean().optional().default(false),
  whatsapp: z.string().optional().default("").transform(normalizeLine).pipe(z.string().max(30)),
  turnstileToken: z.string().min(1, "Conclua a verificação de segurança.").max(2048),
  website: z.string().max(200),
  submissionId: z.string().uuid(),
}).strict().superRefine((contact, context) => {
  const digits = contact.whatsapp.replace(/\D/g, "");
  if (contact.wantsWhatsapp && digits.length < 10) context.addIssue({ code: "custom", path: ["whatsapp"], message: "Informe um número de WhatsApp válido." });
  if (contact.whatsapp && (digits.length < 10 || digits.length > 15)) context.addIssue({ code: "custom", path: ["whatsapp"], message: "Informe um número de WhatsApp válido." });
});

export type ContactInput = z.infer<typeof contactSchema>;
