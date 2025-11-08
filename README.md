## S1lents Fullstack Site

This workspace now contains a modern marketing and checkout experience for the S1lents Discord bot service.

### Structure

- `web/` — Vite + React site with Tailwind CSS, Framer Motion animations, bilingual copy, pricing, hosting panels, purchase dialog, reviews, and a thank-you screen.
- `server/` — Express backend handling Stripe Checkout, automatic ticket/email/webhook notifications, and review forwarding to Discord.
- `ticket_panel.js` — Discord bot helper already in the repo for posting ticket panels inside your server.

### Frontend setup

```bash
cd web
npm install
npm run dev
```

Environment variables:

- Configure `VITE_API_URL` if you deploy backend elsewhere (optional – defaults to same origin when not set).

### Backend setup

```bash
cd server
npm install
cp env.example .env   # fill in your secrets
npm run dev
```

Required secrets in `.env`:

- `STRIPE_SECRET_KEY` and individual `STRIPE_PRICE_*` IDs (source, hosted monthly, hosted lifetime, bundle).
- `STRIPE_WEBHOOK_SECRET` from your Stripe webhook endpoint.
- `SMTP_*` credentials for transactional email, or omit to skip email (warning will be logged).
- `ORDER_WEBHOOK_URL`, `TICKET_WEBHOOK_URL`, `REVIEWS_WEBHOOK_URL` — Discord webhook URLs for logging orders, auto tickets, and streaming client reviews.

### Stripe & automation flow

1. Frontend calls `/api/checkout` with tier, email, Discord handle, optional notes.
2. Stripe Checkout session is created and user is redirected to pay.
3. On `checkout.session.completed`, backend:
   - Sends an email confirmation (if SMTP configured).
   - Posts to `ORDER_WEBHOOK_URL` (general log) **and** `TICKET_WEBHOOK_URL` (auto ticket message).
4. Thank-you page invites client to join the Discord hub.

### Reviews

The “Leave a review” form sends `{ rating, message, name }` to `/api/review` and forwards them to `REVIEWS_WEBHOOK_URL` with star formatting, ready for moderation.

### Discord integration

- Use `ticket_panel.js` to expose the ticket button inside your server (already matching the marketing copy).
- `TICKET_WEBHOOK_URL` should point to a private channel where staff see new orders and can create ticket threads or use your ticket bot.

### Notes

- Replace `https://discord.gg/your-server` with your actual invite in the frontend (`Hero`, `CTA`, `ThankYou` sections).
- Adjust pricing copy in `web/src/data/pricing.ts` if you change amounts.
- Hosting availability notice matches your requirement: hosting plans only sold when source is purchased.

### Scripts overview

| Command | Description |
| ------- | ----------- |
| `npm run dev` | (web/server) Start dev servers |
| `npm run build` | (web) Build production assets |
| `npm run preview` | (web) Preview production build |
| `npm run start` | (server) Start backend without watch |

---

Once deployed, visitors can browse, pay, receive tickets/email/webhooks automatically, and submit reviews that appear inside your Discord server with stars and comments.

