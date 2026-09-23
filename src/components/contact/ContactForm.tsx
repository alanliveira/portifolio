"use client";

import { FormEvent, useState } from "react";
import { ContactStatus } from "./ContactStatus";
import { TurnstileWidget } from "./TurnstileWidget";

type Fields = { name: string; email: string; subject: string; company: string; wantsWhatsapp: boolean; whatsapp: string; message: string; website: string };
type FieldName = keyof Fields;
type FormStatus = "idle" | "loading" | "success" | "error";

const initialFields: Fields = { name: "", email: "", subject: "", company: "", wantsWhatsapp: false, whatsapp: "", message: "", website: "" };
const subjectOptions = ["Desenvolvimento Web", "Desenvolvimento de Games", "IA e automação", "Cloud e deploy", "Parceria ou oportunidade", "Outro assunto"];
const fieldClass = "mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-white outline-none transition focus:border-accent";

function InputError({ id, error }: { id: string; error?: string }) { return error ? <p id={`${id}-error`} className="mt-2 text-sm text-red-200">{error}</p> : null; }
const emailError = (value: string) => !value.trim() ? "Informe seu email." : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "Informe um email válido." : undefined;

export function ContactForm() {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [shouldLoadTurnstile, setShouldLoadTurnstile] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [submissionId, setSubmissionId] = useState(() => crypto.randomUUID());
  const update = (field: FieldName, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validateEmail = () => setErrors((current) => ({ ...current, email: emailError(fields.email) }));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setStatusMessage("");
    setErrors({});
    if (!turnstileToken) { setStatus("error"); setStatusMessage("Conclua a verificação de segurança antes de enviar."); return; }

    try {
      const utmSource = new URLSearchParams(window.location.search).get("utm_source")?.slice(0, 100) ?? "";
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...fields, utmSource, turnstileToken, submissionId }) });
      const result = await response.json() as { ok?: boolean; message?: string; fields?: Partial<Record<FieldName, string>> };
      if (!response.ok || !result.ok) {
        setErrors(result.fields ?? {}); setStatus("error"); setStatusMessage(result.message ?? "Não foi possível enviar sua mensagem. Tente novamente."); setTurnstileToken(null); setResetKey((value) => value + 1); return;
      }
      setFields(initialFields); setStatus("success"); setStatusMessage("Mensagem enviada com sucesso. Obrigado pelo contato!"); setTurnstileToken(null); setSubmissionId(crypto.randomUUID()); setResetKey((value) => value + 1);
    } catch { setStatus("error"); setStatusMessage("Não foi possível enviar sua mensagem. Tente novamente."); setTurnstileToken(null); setResetKey((value) => value + 1); }
  }

  const describedBy = (id: FieldName) => errors[id] ? `${id}-error` : undefined;
  return <form id="formulario-contato" autoComplete="off" onFocusCapture={() => setShouldLoadTurnstile(true)} onSubmit={submit} className="rounded-2xl border border-white/10 bg-[#0b111e]/80 p-5 shadow-2xl backdrop-blur sm:p-7">
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="block text-sm font-medium text-slate-100" htmlFor="name">Nome *<input id="name" name="name" autoComplete="off" minLength={2} maxLength={100} value={fields.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} className={fieldClass} required /><InputError id="name" error={errors.name} /></label>
      <label className="block text-sm font-medium text-slate-100" htmlFor="email">Email *<input id="email" name="email" type="email" autoComplete="off" maxLength={254} value={fields.email} onChange={(event) => update("email", event.target.value)} onBlur={validateEmail} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} className={fieldClass} required /><InputError id="email" error={errors.email} /></label>
      <label className="block text-sm font-medium text-slate-100" htmlFor="subject">Assunto<select id="subject" name="subject" value={fields.subject} onChange={(event) => update("subject", event.target.value)} aria-invalid={Boolean(errors.subject)} aria-describedby={describedBy("subject")} className={`${fieldClass} bg-[#111a2b]`}><option value="" className="bg-[#111a2b] text-white">Selecione uma categoria</option>{subjectOptions.map((option) => <option key={option} value={option} className="bg-[#111a2b] text-white">{option}</option>)}</select><InputError id="subject" error={errors.subject} /></label>
      <label className="block text-sm font-medium text-slate-100" htmlFor="company">Empresa / projeto<input id="company" name="company" autoComplete="off" maxLength={100} value={fields.company} onChange={(event) => update("company", event.target.value)} aria-invalid={Boolean(errors.company)} aria-describedby={describedBy("company")} className={fieldClass} /><InputError id="company" error={errors.company} /></label>
    </div>
    <div className="mt-5"><label className="inline-flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-100" htmlFor="wantsWhatsapp"><input id="wantsWhatsapp" name="wantsWhatsapp" type="checkbox" role="switch" checked={fields.wantsWhatsapp} onChange={(event) => { setFields((current) => ({ ...current, wantsWhatsapp: event.target.checked, whatsapp: event.target.checked ? current.whatsapp : "" })); setErrors((current) => ({ ...current, whatsapp: undefined })); }} className="peer sr-only" /><span aria-hidden="true" className="relative h-6 w-11 rounded-full bg-white/15 transition-colors after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:bg-[#65d9d2] peer-checked:after:translate-x-5 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[#a99fff]" /><span>Deseja informar seu número de WhatsApp?</span></label>{fields.wantsWhatsapp ? <label className="mt-4 block max-w-sm text-sm font-medium text-slate-100" htmlFor="whatsapp">WhatsApp *<input id="whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" value={fields.whatsapp} onChange={(event) => update("whatsapp", event.target.value)} aria-invalid={Boolean(errors.whatsapp)} aria-describedby={describedBy("whatsapp")} className={fieldClass} required /><InputError id="whatsapp" error={errors.whatsapp} /></label> : null}</div>
    <label className="mt-5 block text-sm font-medium text-slate-100" htmlFor="message">Mensagem *<textarea id="message" name="message" rows={6} minLength={10} maxLength={5000} value={fields.message} onChange={(event) => update("message", event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={describedBy("message")} className={`${fieldClass} resize-y`} required /><InputError id="message" error={errors.message} /></label>
    <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor="website">Não preencha este campo</label><input id="website" name="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={(event) => update("website", event.target.value)} /></div>
    <div className="mt-6">{shouldLoadTurnstile ? <TurnstileWidget onToken={setTurnstileToken} resetKey={resetKey} /> : <p className="text-sm text-slate-400">A verificação de segurança será carregada ao preencher o formulário.</p>}</div>
    <div className="mt-6 flex flex-wrap items-center gap-4"><button type="submit" disabled={status === "loading" || !turnstileToken} className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-[#6f61df] disabled:cursor-not-allowed disabled:opacity-60">{status === "loading" ? "Enviando..." : "Enviar mensagem"}</button><p className="text-xs text-slate-400">Campos marcados com * são obrigatórios.</p></div>
    {status !== "idle" ? <div className="mt-5"><ContactStatus type={status === "success" ? "success" : "error"} message={statusMessage} /></div> : null}
  </form>;
}
