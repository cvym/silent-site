import { motion } from "framer-motion";

const steps = [
  {
    title: "1 · Discovery",
    text: "Tell me the bot type, features and hosting preference. You receive a tailored quote in both FR/EN."
  },
  {
    title: "2 · Build",
    text: "Iterative development with check-ins. Previews provided on staging, feedback applied fast."
  },
  {
    title: "3 · Delivery",
    text: "Source code, documentation, environment variables. Optional hand-over call in English or French."
  },
  {
    title: "4 · Launch & Support",
    text: "Production deploy, monitoring setup, SLA support and lifetime review portal for your team."
  }
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">Processus</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            A transparent workflow, start to finish
          </h2>
          <p className="mt-4 text-sm text-white/60">
            Ticket opens automatically after purchase. You&apos;re never left guessing — everything is
            handled inside the support hub with email updates.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="glass rounded-3xl border border-white/10 p-6 text-sm text-white/70"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-3">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

