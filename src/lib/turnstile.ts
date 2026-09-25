import "server-only";

type TurnstileResult = { success: boolean; hostname?: string; action?: string; "error-codes"?: string[] };

function expectedHostnames() {
  return new Set((process.env.TURNSTILE_HOSTNAMES ?? "").split(",").map((hostname) => hostname.trim()).filter(Boolean));
}

export async function verifyTurnstile(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("Turnstile verification is not configured");
    return false;
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Turnstile verification request failed", { status: response.status });
    return false;
  }
  const result = await response.json() as TurnstileResult;
  if (!result.success) {
    console.error("Turnstile token rejected", { errorCodes: result["error-codes"] ?? [] });
    return false;
  }
  if (process.env.NODE_ENV !== "production") return true;

  const hostnames = expectedHostnames();
  const valid = result.action === "contact" && typeof result.hostname === "string" && hostnames.has(result.hostname);
  if (!valid) console.error("Turnstile token did not match production policy", { action: result.action, hostname: result.hostname, allowedHostnames: [...hostnames] });
  return valid;
}
