import { motion } from "framer-motion";

interface HeroSectionProps {
  onStartPurchase: () => void;
}

const HeroSection = ({ onStartPurchase }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-brand-accent/30 blur-3xl" />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70"
          >
            <span>Custom Bots</span>
            <span className="h-5 w-px bg-white/20" />
            <span>Hosting</span>
            <span className="h-5 w-px bg-white/20" />
            <span>Support</span>
          </motion.div>

          <motion.h1
            className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
          >
            Build the Discord bot your community deserves —
            <span className="gradient-text"> in English and French.</span>
          </motion.h1>

          <motion.p
            className="max-w-2xl text-lg text-white/70"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            __S1lents__ delivers stable, reliable and tailor-made Discord bots. From moderation to
            economy systems, analytics, AI assistants, ticket flows and web integrations, we
            engineer the exact features you need — plus optional 24/7 hosting.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
          >
            <button
              onClick={onStartPurchase}
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand/40 transition hover:bg-brand-accent"
            >
              Start your project
            </button>
            <a
              href="https://discord.gg/your-server"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white/80 hover:bg-white/10"
            >
              Join Support Server
            </a>
          </motion.div>

          <motion.div
            className="grid gap-4 text-sm text-white/60 sm:grid-cols-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
          >
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-white">Built for growth</p>
              <p>Automations, dashboards & smart onboarding to scale your server.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-white">Hosting ready</p>
              <p>Keep your bot online 24/7 with monitoring, alerts and quick fixes.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-white">2 languages</p>
              <p>Process, documentation & support disponibles en français et anglais.</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-1 shadow-[0_0_40px_rgba(88,101,242,0.2)]"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="rounded-3xl border border-white/10 bg-black/70 p-8">
            <p className="text-sm uppercase tracking-widest text-brand-light">Quick overview</p>
            <h3 className="mt-4 text-2xl font-semibold">From idea to live bot.</h3>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li>• Modular architecture with TypeScript / Python micro-services</li>
              <li>• Lavalink, AI models, web dashboards, OAuth2 flows ready</li>
              <li>• Staging environment included before production rollout</li>
              <li>• Ticket-based support with SLAs agreed upfront</li>
              <li>• Optional analytics portal & staff training session</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

