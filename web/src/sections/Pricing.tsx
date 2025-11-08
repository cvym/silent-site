import { motion } from "framer-motion";
import { pricingOptions } from "../data/pricing";

interface PricingSectionProps {
  onStartPurchase: () => void;
}

const PricingSection = ({ onStartPurchase }: PricingSectionProps) => {
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">Pricing</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Crystal-clear pricing, no hidden fees
          </h2>
          <p className="mt-4 text-sm text-white/60">
            Source code purchases unlock hosting options. All plans include bilingual support,
            proactive monitoring and Discord onboarding.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricingOptions.map((option, index) => (
            <motion.div
              key={option.id}
              className={`glass flex h-full flex-col justify-between rounded-3xl border border-white/10 p-6 text-sm transition hover:-translate-y-1 hover:border-brand/80 ${
                option.highlight ? "bg-white/10" : ""
              }`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-brand-light">
                  {option.highlight ? "Best value" : "Option"}
                </p>
                <h3 className="mt-4 text-xl font-semibold">{option.title}</h3>
                <p className="mb-4 text-xs text-white/60">{option.subtitle}</p>
                <p className="text-lg font-semibold text-brand-light">{option.priceLabel}</p>
                <ul className="mt-4 space-y-2 text-white/60">
                  {option.description.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-brand">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={onStartPurchase}
                className="mt-6 w-full rounded-full border border-brand/50 bg-brand/40 px-4 py-2 font-semibold text-white transition hover:bg-brand hover:shadow-lg hover:shadow-brand/40"
              >
                Select
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

