import { motion } from "framer-motion";

interface CTASectionProps {
  onStartPurchase: () => void;
}

const CTASection = ({ onStartPurchase }: CTASectionProps) => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          className="glass overflow-hidden rounded-3xl border border-brand/30 bg-brand/10 p-10 text-center shadow-lg shadow-brand/20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">Ready?</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Launch your Discord experience today
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-white/70">
            Start with the source or go all-in with lifetime hosting. After checkout, your ticket is
            opened instantly and you join the private support Discord where we plan the build.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={onStartPurchase}
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide text-brand transition hover:bg-brand-light hover:text-brand-dark"
            >
              Purchase now
            </button>
            <a
              href="https://discord.gg/AfQj8wJApb"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white/80 hover:bg-white/10"
            >
              Chat on Discord
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

