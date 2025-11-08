import { motion } from "framer-motion";
import ReviewForm from "../components/ReviewForm";

const reviews = [
  {
    name: "Nova RP Staff",
    rating: 5,
    text: "Our moderation flows are finally automated. Delivery was fast and the support ticket system is super clear.",
    locale: "EN"
  },
  {
    name: "Serveur Esport FR",
    rating: 5,
    text: "Bot sur mesure, ticket + boutique intégrée, hébergement nickel. Communication fluide en français.",
    locale: "FR"
  },
  {
    name: "CryptoHub",
    rating: 4,
    text: "API Notion + webhooks vers nos dashboards. Quelques itérations rapides et c'était prêt pour la prod.",
    locale: "EN"
  }
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">Feedback</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Clients love the tailored process
          </h2>
          <p className="mt-4 text-sm text-white/60">
            After every delivery, clients can rate the experience. Reviews are pushed to Discord with
            a star rating so you get transparent feedback.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                className="glass rounded-3xl border border-white/10 p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
              >
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>{review.name}</span>
                  <span>{review.locale}</span>
                </div>
                <div className="mt-3 text-brand text-lg">
                  {"★".repeat(review.rating)}
                  <span className="text-white/30">
                    {"★".repeat(Math.max(0, 5 - review.rating))}
                  </span>
                </div>
                <p className="mt-3 text-sm text-white/70">{review.text}</p>
              </motion.div>
            ))}
          </div>

          <ReviewForm />
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

