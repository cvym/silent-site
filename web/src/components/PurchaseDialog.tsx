import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { pricingOptions, type PackageTier } from "../data/pricing";
import api from "../lib/api";

interface PurchaseDialogProps {
  onClose: () => void;
}

const fallbackError = "Something went wrong. Please try again or contact support on Discord.";

const PurchaseDialog = ({ onClose }: PurchaseDialogProps) => {
  const [tier, setTier] = useState<PackageTier>("bundle");
  const [email, setEmail] = useState("");
  const [discordTag, setDiscordTag] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/api/checkout", {
        tier,
        email,
        discordTag,
        notes
      });

      if (response.data?.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      } else {
        throw new Error("Missing checkout URL");
      }
    } catch (err) {
      console.error(err);
      setError(fallbackError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl p-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
      >
        <button
          type="button"
          className="absolute right-5 top-5 rounded-full bg-white/10 px-3 py-1 text-sm text-white/60 hover:bg-white/20"
          onClick={onClose}
        >
          Close
        </button>
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="mb-1 text-2xl font-semibold">
              Checkout · <span className="gradient-text">S1lents</span>
            </h2>
            <p className="mb-6 text-sm text-white/70">
              Choose the package that fits you best. Payments are securely processed via Stripe.
              Hosting is available only if the source code is included (Source or Bundle tiers).
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-wide text-white/60">
                  Package
                </label>
                <div className="grid gap-3">
                  {pricingOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-brand/70 ${
                        tier === option.id ? "ring-2 ring-brand" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="package"
                        value={option.id}
                        checked={tier === option.id}
                        onChange={() => setTier(option.id)}
                        className="mt-1 accent-brand"
                      />
                      <div>
                        <p className="text-sm font-semibold">{option.title}</p>
                        <p className="text-xs text-white/60">{option.subtitle}</p>
                        <p className="text-xs text-brand-light">{option.priceLabel}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/60">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm focus:border-brand focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/60">
                    Discord Username
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="username"
                    value={discordTag}
                    onChange={(event) => setDiscordTag(event.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm focus:border-brand focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/60">
                  Project details (FR/EN welcome)
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell me about the bot, key features, hosting preference, deadlines, budget... / Décris le bot, les fonctionnalités, hébergement voulu, deadline, budget..."
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm focus:border-brand focus:outline-none"
                />
              </div>

              {error && (
                <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                  {error}
                </p>
              )}

              <div className="flex items-center justify-between gap-4 text-xs text-white/50">
                <p>
                  🇬🇧 & 🇫🇷 support included. After checkout you&apos;ll be invited to the Discord
                  hub for onboarding.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-brand px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-brand/40 transition hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-75"
                >
                  {loading ? "Preparing checkout..." : "Continue to payment"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-sm text-white/60 hover:text-white transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 text-sm">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-white">What happens next?</h3>
              <ul className="space-y-2 text-white/70">
                <li>1. Stripe handles the secure payment in your currency.</li>
                <li>2. You instantly receive a confirmation email and Discord invite link.</li>
                <li>3. A ticket is opened automatically in the private support hub.</li>
                <li>4. We align on requirements and timeline inside the ticket.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-light">
                Hosting availability
              </h4>
              <p className="text-white/70">
                Hosting plans are only offered when the source is part of your order (Source or
                Bundle). If you just need hosting later, you can upgrade anytime from the client
                portal.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-light">
                Sécurité & conformité
              </h4>
              <p className="text-white/70">
                Paiement sécurisé (Stripe), facture envoyée par e-mail. Support complet en français
                et en anglais — tu es guidé·e du devis au déploiement.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PurchaseDialog;

