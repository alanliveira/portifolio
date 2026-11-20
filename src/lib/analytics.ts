type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const target = window as DataLayerWindow;
  target.dataLayer = target.dataLayer ?? [];
  target.dataLayer.push({ event, ...params });
}
