import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { sendContactEmail } from "@/lib/resend";
import { verifyTurnstile } from "@/lib/turnstile";
import { contactSchema } from "@/lib/validation/contact";

const MAX_BODY_SIZE = 12_000;
const headers = { "Cache-Control": "no-store" };

function error(message: string, status: number, fields?: Record<string, string>) {
  return NextResponse.json({ ok: false, message, fields }, { status, headers });
}

function fieldErrors(validationError: ZodError) {
  return Object.fromEntries(validationError.issues.map((issue) => [String(issue.path[0]), issue.message]));
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_SIZE) return error("Revise os campos indicados.", 400);

  let payload: unknown;
  try {
    const body = await request.text();
    if (body.length > MAX_BODY_SIZE) return error("Revise os campos indicados.", 400);
    payload = JSON.parse(body);
  } catch {
    return error("Revise os campos indicados.", 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) return error("Revise os campos indicados.", 400, fieldErrors(parsed.error));
  if (parsed.data.website) return NextResponse.json({ ok: true }, { headers });

  try {
    const validTurnstile = await verifyTurnstile(parsed.data.turnstileToken);
    if (!validTurnstile) return error("Não foi possível validar a verificação de segurança. Tente novamente.", 400);

    const sent = await sendContactEmail(parsed.data);
    if (!sent) return error("Não foi possível enviar sua mensagem agora. Tente novamente mais tarde.", 502);
    return NextResponse.json({ ok: true }, { headers });
  } catch (cause) {
    console.error("Contact form submission failed", { message: cause instanceof Error ? cause.message : String(cause) });
    return error("Não foi possível enviar sua mensagem agora. Tente novamente mais tarde.", 500);
  }
}
