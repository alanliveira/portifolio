import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact";

const validContact = {
  name: "Alan Oliveira",
  email: "alan@example.com",
  subject: "Projeto",
  company: "Empresa",
  message: "Gostaria de conversar sobre um projeto.",
  utmSource: "linkedin",
  turnstileToken: "token-valido",
  website: "",
  submissionId: "123e4567-e89b-12d3-a456-426614174000",
};

describe("contactSchema", () => {
  it("normaliza e aceita um contato válido", () => {
    const parsed = contactSchema.parse({ ...validContact, name: "  Alan   Oliveira ", message: "  Uma mensagem válida.  " });
    expect(parsed.name).toBe("Alan Oliveira");
    expect(parsed.message).toBe("Uma mensagem válida.");
  });

  it("rejeita email inválido, nome vazio e mensagem curta", () => {
    const result = contactSchema.safeParse({ ...validContact, name: "", email: "invalido", message: "curta" });
    expect(result.success).toBe(false);
  });

  it("rejeita mensagens acima do limite", () => {
    const result = contactSchema.safeParse({ ...validContact, message: "a".repeat(5001) });
    expect(result.success).toBe(false);
  });

  it("exige WhatsApp válido quando o switch está ativo", () => {
    const result = contactSchema.safeParse({ ...validContact, wantsWhatsapp: true, whatsapp: "123" });
    expect(result.success).toBe(false);
  });
});
