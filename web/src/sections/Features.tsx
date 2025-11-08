import { motion } from "framer-motion";
import { featureList } from "../data/features";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Capabilities</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Build the exact bot you imagine</h2>
          </div>
          <p className="max-w-2xl text-sm text-white/60">
            Mix and match modules or request something entirely unique. From automation pipelines to
            mini-games with progression paths, we design systems that make your server stand out.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {featureList.map((feature, index) => (
            <motion.article
              key={feature.title}
              className="glass group relative overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/20"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand/20 blur-2xl transition group-hover:bg-brand/30" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-4 text-sm text-white/70">{feature.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {feature.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

