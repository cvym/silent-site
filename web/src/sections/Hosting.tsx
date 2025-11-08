import { motion } from "framer-motion";

interface HostingSectionProps {
  onStartPurchase: () => void;
}

const HostingSection = ({ onStartPurchase }: HostingSectionProps) => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            className="glass rounded-3xl border border-white/10 p-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-brand-light">Hosting services</p>
            <h2 className="mt-3 text-3xl font-semibold">
              Keep your Discord bot online 24/7 with proactive care
            </h2>
            <p className="mt-4 text-sm text-white/70">
              Managed cloud, priority incident response and observability dashboards. Hosting is
              available exclusively when the source code is part of your order (Source or Bundle
              tiers) — you stay in control of your project.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Managed Cloud",
                  points: [
                    "Auto restarts & health checks",
                    "Version pinning & rollbacks",
                    "Full monitoring dashboard"
                  ]
                },
                {
                  title: "Performance Tier",
                  points: [
                    "Dedicated resources",
                    "Shard-ready architecture",
                    "Premium response times"
                  ]
                },
                {
                  title: "Custom Deployment",
                  points: [
                    "Deploy on your infra",
                    "CI/CD & config automation",
                    "Hand-over session"
                  ]
                },
                {
                  title: "Security",
                  points: [
                    "Secret rotation policy",
                    "Audit trail per release",
                    "Encrypted backups"
                  ]
                }
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70"
                >
                  <p className="text-base font-semibold text-white">{card.title}</p>
                  <ul className="mt-3 space-y-1">
                    {card.points.map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="space-y-6 rounded-3xl border border-brand/30 bg-brand/10 p-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-semibold">Pricing snapshot</h3>
            <div className="space-y-4 text-sm text-white/70">
              <div>
                <p className="text-white">Source code — $10 one-time</p>
                <p>Full source, setup docs, update pass.</p>
              </div>
              <div>
                <p className="text-white">Hosted monthly — $3/mo</p>
                <p>Managed uptime, monitoring & SLA support.</p>
              </div>
              <div>
                <p className="text-white">Hosted lifetime — $30 one-time</p>
                <p>Permanent managed slot with priority fixes.</p>
              </div>
              <div>
                <p className="text-white">Bundle — $38 one-time</p>
                <p>Source code + lifetime hosting = best savings.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/60">
              Hosting is only provided when the source is included. Upgrade later by merging into
              the bundle at any time.
            </div>
            <button
              onClick={onStartPurchase}
              className="w-full rounded-full bg-white/90 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-brand transition hover:bg-white"
            >
              Compare plans & purchase
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HostingSection;

