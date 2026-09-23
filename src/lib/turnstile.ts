import "server-only";

type TurnstileResult = { success: boolean; hostname?: string; action?: string };

export async function verifyTurnstile(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
    cache: "no-store",
  });

  if (!response.ok) return false;
  const result = await response.json() as TurnstileResult;
  if (!result.success) return false;
  if (process.env.NODE_ENV !== "production") return true;
  if (result.action && result.action !== "contact") return false;

  const expectedHostname = process.env.SITE_URL ? new URL(process.env.SITE_URL).hostname : undefined;
  return !(expectedHostname && result.hostname && result.hostname !== expectedHostname);
}
