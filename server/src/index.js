import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import axios from "axios";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: "2023-10-16" }) : null;

const priceMap = {
  source: process.env.STRIPE_PRICE_SOURCE,
  "host-monthly": process.env.STRIPE_PRICE_HOST_MONTHLY,
  "host-lifetime": process.env.STRIPE_PRICE_HOST_LIFETIME,
  bundle: process.env.STRIPE_PRICE_BUNDLE
};

const requiredStripe = ["source", "host-monthly", "host-lifetime", "bundle"].filter(
  (key) => !priceMap[key],
);
if (stripe && requiredStripe.length) {
  console.warn("Missing Stripe price IDs for: ", requiredStripe.join(", "));
}

app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  }),
);

const transporter =
  process.env.SMTP_HOST && process.env.SMTP_USER
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    : null;

function formatTierLabel(tier) {
  switch (tier) {
    case "source":
      return "Source Code";
    case "host-monthly":
      return "Hosted Monthly";
    case "host-lifetime":
      return "Hosted Lifetime";
    case "bundle":
      return "Bundle (Source + Lifetime Hosting)";
    default:
      return tier;
  }
}

async function sendConfirmationEmail({ email, tier, discordTag }) {
  if (!transporter) {
    console.warn("Mail transporter not configured. Skipping email sending.");
    return;
  }

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || "S1lents <no-reply@s1lents.dev>",
    to: email,
    subject: "S1lents · Order received",
    text: [
      `Thanks for purchasing ${formatTierLabel(tier)}.`,
      "",
      "What's next?",
      "- A ticket has been opened on the support Discord.",
      "- You will receive updates there and by email.",
      "",
      `Discord handle: ${discordTag}`,
      "",
      "À très vite !",
    ].join("\n"),
  });
  console.log("Sent confirmation email: %s", info.messageId);
}

async function pingWebhook(url, payload) {
  if (!url) {
    return;
  }
  try {
    await axios.post(url, payload);
  } catch (error) {
    console.error("Failed to post to webhook", error?.response?.data || error.message);
  }
}

async function notifyOrder({ tier, email, discordTag, notes }) {
  await pingWebhook(process.env.ORDER_WEBHOOK_URL, {
    content: [
      `🛒 **New order received**`,
      `Tier: **${formatTierLabel(tier)}**`,
      `Email: ${email}`,
      `Discord: ${discordTag}`,
      notes ? `Notes:\n${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  });
  await pingWebhook(process.env.TICKET_WEBHOOK_URL, {
    content: [
      `🎫 **Ticket auto-create**`,
      `New client: ${discordTag} (${email})`,
      `Tier: ${formatTierLabel(tier)}`,
      notes ? `Details: ${notes}` : "",
      "",
      "Please welcome them and gather requirements.",
    ]
      .filter(Boolean)
      .join("\n"),
  });
}

app.post("/api/checkout", express.json(), async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: "Stripe not configured." });
  }

  const { tier, email, discordTag, notes } = req.body || {};

  if (!tier || !priceMap[tier]) {
    return res.status(400).json({ error: "Invalid tier selected." });
  }
  if (!email || !discordTag) {
    return res.status(400).json({ error: "Email and Discord username are required." });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      metadata: {
        tier,
        email,
        discordTag,
        notes: notes || "",
      },
      line_items: [
        {
          price: priceMap[tier],
          quantity: 1,
        },
      ],
      success_url: `${clientOrigin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientOrigin}/?canceled=true`,
    });

    return res.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error("Stripe checkout error", error);
    return res.status(500).json({ error: "Failed to create checkout session." });
  }
});

app.post("/api/review", express.json(), async (req, res) => {
  const { rating, message, name } = req.body || {};
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5." });
  }
  if (!message || !name) {
    return res.status(400).json({ error: "Name and message are required." });
  }

  await pingWebhook(process.env.REVIEWS_WEBHOOK_URL, {
    content: [
      `⭐ **New review (${rating}/5)**`,
      `Client: ${name}`,
      "",
      message,
    ].join("\n"),
  });

  return res.json({ status: "ok" });
});

app.post(
  "/webhooks/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    if (!stripe) {
      return res.status(400).send("Stripe not configured.");
    }
    const signature = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;

    try {
      if (webhookSecret) {
        event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
      } else {
        event = req.body;
      }
    } catch (err) {
      console.error("Stripe webhook signature verification failed", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const metadata = session.metadata || {};
      console.log("Checkout completed", metadata);
      try {
        await sendConfirmationEmail({
          email: metadata.email,
          tier: metadata.tier,
          discordTag: metadata.discordTag,
        });
        await notifyOrder({
          tier: metadata.tier,
          email: metadata.email,
          discordTag: metadata.discordTag,
          notes: metadata.notes,
        });
      } catch (error) {
        console.error("Post-checkout pipeline failed", error);
      }
    }

    res.json({ received: true });
  },
);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});

