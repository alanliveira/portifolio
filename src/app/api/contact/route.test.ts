import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ verifyTurnstile: vi.fn(), sendContactEmail: vi.fn() }));

vi.mock("@/lib/turnstile", () => ({ verifyTurnstile: mocks.verifyTurnstile }));
vi.mock("@/lib/resend", () => ({ sendContactEmail: mocks.sendContactEmail }));

import { POST } from "./route";

const validPayload = {
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

function request(payload: unknown) {
  return new Request("http://localhost/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejeita o CAPTCHA inválido sem chamar o Resend", async () => {
    mocks.verifyTurnstile.mockResolvedValue(false);
    const response = await POST(request(validPayload));
    expect(response.status).toBe(400);
    expect(mocks.sendContactEmail).not.toHaveBeenCalled();
  });

  it("não envia email quando o honeypot está preenchido", async () => {
    const response = await POST(request({ ...validPayload, website: "https://spam.example" }));
    expect(response.status).toBe(200);
    expect(mocks.verifyTurnstile).not.toHaveBeenCalled();
    expect(mocks.sendContactEmail).not.toHaveBeenCalled();
  });

  it("envia apenas depois da validação do CAPTCHA", async () => {
    mocks.verifyTurnstile.mockResolvedValue(true);
    mocks.sendContactEmail.mockResolvedValue(true);
    const response = await POST(request(validPayload));
    expect(response.status).toBe(200);
    expect(mocks.sendContactEmail).toHaveBeenCalledOnce();
  });
});
