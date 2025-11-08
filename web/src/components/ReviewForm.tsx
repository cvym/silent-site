import { useState } from "react";
import { motion } from "framer-motion";
import api from "../lib/api";

const stars = [1, 2, 3, 4, 5];

const ReviewForm = () => {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!message || !name) {
      setError("Please provide your name and a short comment.");
      return;
    }
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await api.post("/api/review", {
        rating,
        message,
        name
      });
      setSuccess("Thanks! Your feedback was sent to the Discord hub.");
      setMessage("");
      setName("");
      setRating(5);
    } catch (err) {
      console.error(err);
      setError("Could not send review. Try again later or ping me on Discord.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="glass rounded-3xl border border-white/10 p-6 text-sm"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-white">Leave a review</h3>
      <p className="mt-2 text-xs text-white/60">
        Your review appears on the site and a star rating is sent to the private Discord channel.
      </p>

      <div className="mt-4">
        <label className="text-xs font-semibold uppercase tracking-wide text-white/50">
          Rating
        </label>
        <div className="mt-2 flex gap-1">
          {stars.map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`h-9 w-9 rounded-full text-lg transition ${
                rating >= star ? "bg-brand text-white" : "bg-white/10 text-white/50"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label className="text-xs font-semibold uppercase tracking-wide text-white/50">
          Name / Discord Tag
        </label>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Acme Corp · @client"
          className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm focus:border-brand focus:outline-none"
        />
      </div>

      <div className="mt-4">
        <label className="text-xs font-semibold uppercase tracking-wide text-white/50">
          Feedback
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Share what you loved about the delivery, support or hosting."
          className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm focus:border-brand focus:outline-none"
        />
      </div>

      {error && (
        <p className="mt-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">
          {success}
        </p>
      )}

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Sending..." : "Submit review"}
        </button>
        <p className="text-xs text-white/40">Moderated via Discord tickets.</p>
      </div>
    </motion.div>
  );
};

export default ReviewForm;

