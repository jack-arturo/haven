# Haven - Cloudflare Pages Deployment Guide

## Prerequisites

1. **Cloudflare Account** (free tier works)
2. **Stripe Account** (for payments)
3. **Domain Name** (optional, can use Cloudflare subdomain)
4. **Git Repository** (GitHub, GitLab, or Bitbucket)

---

## Step 1: Stripe Setup

### Create Stripe Products

1. Log into [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Products** → **Add Product**
3. Create products for each item:

**Week 1: Moroccan TV Covers**
- Name: "Moroccan TV Cover - 65 inch"
- Price: $200 (one-time payment)
- Repeat for 75" ($400) and 85" ($600)

**Or use dynamic pricing in checkout session** (recommended - see `worker.js`)

### Get API Keys

1. Go to **Developers** → **API Keys**
2. Copy:
   - **Publishable Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`)

3. Go to **Developers** → **Webhooks**
4. Click **Add Endpoint**
5. URL: `https://your-domain.com/api/stripe-webhook`
6. Events to listen for:
   - `checkout.session.completed`
7. Copy the **Webhook Signing Secret** (starts with `whsec_`)

---

## Step 2: Cloudflare Pages Setup

### Deploy Static Site


### Deploy Worker

## Step 5: Custom Domain (Optional)

1. In Cloudflare Pages project: **Custom Domains** → **Set up a custom domain**
2. Enter your domain (e.g., `haven.store`)
3. Cloudflare will configure DNS automatically
4. SSL certificate is auto-provisioned (takes ~24 hours)

---

## Step 6: Email Service Integration

### Option A: Resend (Recommended)

1. Sign up at [Resend.com](https://resend.com)
2. Get API key
3. Add to worker environment variables:
   ```
   RESEND_API_KEY = re_...
   ```
4. Uncomment email code in `worker.js`

### Option B: SendGrid

1. Sign up at [SendGrid.com](https://sendgrid.com)
2. Create API key
3. Add to environment variables:
   ```
   SENDGRID_API_KEY = SG...
   ```
4. Update `worker.js` email function

### Option C: Cloudflare Email Workers

Use Cloudflare Email Routing + Workers to send emails directly.

---

## Step 7: Test the Flow

### Test Mode (Using Stripe Test Keys)

1. Use test card: `4242 4242 4242 4242`
2. Any future expiry date
3. Any CVC

### Test Checklist:

- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Product page displays variants
- [ ] Variant selection updates price
- [ ] Stripe checkout opens
- [ ] Test purchase completes
- [ ] Webhook receives event

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Update `wrangler.toml` with your KV namespace IDs:
   ```toml
   kv_namespaces = [
       { binding = "ORDERS_KV", id = "your-orders-kv-id" },
       { binding = "EMAILS_KV", id = "your-emails-kv-id" }
   ]
   ```

4. Deploy the worker:
   ```bash
   wrangler deploy
   ```

### Connect Worker to Pages

1. Go to your **Cloudflare Pages project**
2. **Settings** → **Functions**
3. Add route: `/api/*` → Your Worker

**Or** use Pages Functions (simpler):
- Create `functions/api/` directory
- Move worker code into Pages Functions structure
- Cloudflare Pages will auto-deploy

---

## Step 4: Update Frontend with Stripe Key

1. Open `drops/week1-moroccan-covers.html`
2. Replace this line:
   ```javascript
   const stripe = Stripe('YOUR_STRIPE_PUBLISHABLE_KEY');
   ```
   
   With your actual publishable key:
   ```javascript
   const stripe = Stripe('pk_live_...');
   ```

3. Commit and push:
   ```bash
   git add .
   git commit -m "Add Stripe key"
   git push
   ```

Cloudflare Pages will auto-deploy.

---
│   └── week6-soundbar-covers.html
├── worker.js               # Cloudflare Worker (API routes)
├── wrangler.toml           # Worker config
├── email-templates.md      # Email copy
├── 6-WEEK-CONTENT-CALENDAR.md
└── DEPLOYMENT.md           # This file
```

---

## Troubleshooting

### Stripe Checkout Not Opening

1. Check browser console for errors
2. Verify `STRIPE_PUBLISHABLE_KEY` is correct
3. Check `/api/create-checkout-session` returns valid session ID

### Webhook Not Receiving Events

1. Go to Stripe Dashboard → Webhooks
2. Check event logs for errors
3. Verify webhook URL is correct: `https://your-domain.com/api/stripe-webhook`
4. Check `STRIPE_WEBHOOK_SECRET` environment variable

### Email Not Sending

1. Check worker logs in Cloudflare Dashboard
2. Verify email service API key is correct
3. Check email service dashboard for delivery logs

### KV Storage Not Working

1. Verify KV namespace IDs in `wrangler.toml`
2. Check worker has KV binding configured
3. Use Cloudflare Dashboard to view KV data

---

## Cost Breakdown (Monthly)

### Cloudflare Pages
- **Free tier:** Unlimited requests, unlimited bandwidth
- **Cost:** $0/month

### Cloudflare Workers
- **Free tier:** 100,000 requests/day
- **Cost:** $0/month (likely sufficient for launch)

### Cloudflare KV
- [ ] Order stored in KV
- [ ] Confirmation email sent
- [ ] Email signup works
- [ ] Email stored in KV

---

## Step 8: Go Live Checklist

### Before Launch:

- [ ] Replace all Stripe test keys with live keys
- [ ] Test live checkout flow with real card
- [ ] Verify webhook endpoint is working
- [ ] Set up email notifications
- [ ] Add product photography (replace placeholders)
- [ ] Test on mobile devices
- [ ] Check site speed (should be fast on Cloudflare)
- [ ] Set up Google Analytics (optional)
- [ ] Create social media accounts
- [ ] Prepare Week 1 email blast

### Launch Day:

- [ ] Send email notification to list
- [ ] Post on social media
- [ ] Monitor sales in real-time
- [ ] Watch for any errors in Cloudflare logs
- [ ] Respond to customer questions

---

## File Structure

```
haven/
├── index.html              # Homepage
├── about.html              # About page
├── drops.html              # All drops archive
├── notify.html             # Email signup
├── styles.css              # Global styles
├── script.js               # Global JS
├── drops/
│   ├── week1-moroccan-covers.html
│   ├── week2-throw-pillows.html
│   ├── week3-airpods-cases.html
│   ├── week4-cat-sweaters.html
│   ├── week5-christmas-hats.html
4. **Content:** Start creating behind-the-scenes artisan content
5. **Community:** Engage with customers on social media
6. **Iteration:** Adjust pricing/inventory based on demand

---

## Support & Resources

- **Cloudflare Pages Docs:** https://developers.cloudflare.com/pages/
- **Cloudflare Workers Docs:** https://developers.cloudflare.com/workers/
- **Stripe Checkout Docs:** https://stripe.com/docs/payments/checkout
- **Stripe Webhooks Guide:** https://stripe.com/docs/webhooks

---

## Quick Start Commands

```bash
# Clone and setup
git clone YOUR_REPO_URL haven
cd haven

# Deploy to Cloudflare Pages (via Git push)
git push origin main

# Deploy worker
npm install -g wrangler
wrangler login
wrangler deploy

# Test locally (optional)
wrangler dev
```

---

**You're ready to launch. Good luck with Haven! 🏡**
- **Free tier:** 100,000 reads/day, 1,000 writes/day
- **Cost:** $0/month (sufficient for launch)

### Stripe
- **Transaction fee:** 2.9% + $0.30 per transaction
- **Example:** $200 sale = $6.10 fee (you keep $193.90)

### Email Service (Resend)
- **Free tier:** 3,000 emails/month
- **Cost:** $0/month initially

### Domain Name
- **Cost:** ~$10-15/year (via Cloudflare Registrar)

**Total Monthly Cost: $0-5** (excluding transaction fees)

---

## Scaling Strategy

### If Traffic Grows:

1. **Cloudflare Pages:** Handles millions of requests (no cost increase)
2. **Workers:** Upgrade to $5/month for 10M requests
3. **KV Storage:** Upgrade to $5/month for unlimited storage
4. **Email:** Resend paid plans start at $20/month

### If Sales Volume Grows:

- Stripe fees scale with revenue (2.9% + $0.30)
- Consider Stripe volume discounts for high volume

---

## Security Checklist

- [ ] Never commit Stripe secret keys to Git
- [ ] Use environment variables for all secrets
- [ ] Verify webhook signatures (already in code)
- [ ] Enable HTTPS (automatic with Cloudflare)
- [ ] Test for XSS vulnerabilities
- [ ] Add rate limiting to API endpoints (optional)
- [ ] Monitor for fraudulent orders

---

## Next Steps After Launch

1. **Week 1:** Monitor sales, gather feedback
2. **Week 2:** Launch throw pillows, cross-sell to Week 1 customers
3. **Analytics:** Track conversion rates, identify drop-offs
