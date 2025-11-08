import { useMemo } from "react";

const ThankYouPage = () => {
  const sessionId = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return new URLSearchParams(window.location.search).get("session_id");
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-light">Merci · Thank you</p>
        <h1 className="mt-4 text-4xl font-semibold">Order received!</h1>
        <p className="mt-4 text-sm text-white/70">
          We just opened your ticket on the private Discord hub and a confirmation email is on its
          way. Click below to jump into the server and share any extra details.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-brand transition hover:bg-brand-light hover:text-brand-dark"
            href="https://discord.gg/your-server"
            target="_blank"
            rel="noreferrer"
          >
            Join the Discord Hub
          </a>
          <a
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white/80 hover:bg-white/10"
            href="mailto:contact@s1lents.dev"
          >
            Need to update the brief?
          </a>
        </div>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
          <p>Stripe session ID (save for reference):</p>
          <p className="mt-1 font-mono text-white/80">{sessionId ?? "Unavailable"}</p>
        </div>
        <p className="mt-6 text-xs text-white/40">
          Reviews tab in the client portal lets you share your experience once we complete the bot.
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;

