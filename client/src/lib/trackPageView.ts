const VISITOR_KEY = "tyd_visitor";

function getVisitorId(): string | null {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

export function trackPageView(path: string) {
  if (path.startsWith("/admin")) return;
  let referrer: string | null = null;
  try {
    const ref = document.referrer ? new URL(document.referrer) : null;
    if (ref && ref.host !== location.host) referrer = ref.host;
  } catch {}
  const body = JSON.stringify({ path, referrer, visitorId: getVisitorId() });
  try {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {}
}
