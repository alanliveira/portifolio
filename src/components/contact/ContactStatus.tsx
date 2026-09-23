export function ContactStatus({ type, message }: { type: "success" | "error"; message: string }) {
  return <p role={type === "error" ? "alert" : "status"} aria-live="polite" className={`rounded-lg border px-4 py-3 text-sm leading-6 ${type === "success" ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100" : "border-red-300/30 bg-red-300/10 text-red-100"}`}>{message}</p>;
}
