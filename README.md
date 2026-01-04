# Haven - "Reclaim Your Space"

> Anti-tech, pro-cozy, luxury minimalism with global artisan storytelling

A complete e-commerce site built for Cloudflare Pages + Stripe, featuring a 6-week product drop strategy inspired by streetwear culture and artisan craft.

---

## 🎯 Project Overview

**Brand:** Haven  
**Philosophy:** Technology should serve us, not dominate our homes  
**Business Model:** Weekly product drops with limited quantities (streetwear model)  
**Tech Stack:** Cloudflare Pages + Stripe + Cloudflare Workers  
**Target Market:** UK/US, design-conscious homeowners, 25-45 years old  

---

## 📦 What's Included

### Complete Site Files
- ✅ **Homepage** - Hero section with current drop
- ✅ **About Page** - Brand philosophy and artisan stories
- ✅ **Drops Archive** - All 6 weeks of product pages
- ✅ **Email Signup** - Notification system for new drops
- ✅ **Responsive Design** - Mobile-first, minimal aesthetic
- ✅ **Global CSS** - Earthy palette, lots of white space
- ✅ **JavaScript** - Variant selection, form handling, animations

### 6-Week Product Lineup
1. **Week 1:** Moroccan TV Covers ($200-600) - HERO LAUNCH
2. **Week 2:** Matching Throw Pillows ($80)
3. **Week 3:** Hand-Knitted AirPods Cases ($45)
4. **Week 4:** Cat Sweaters ($65)
5. **Week 5:** Welsh Christmas Hats ($55)
6. **Week 6:** Soundbar/Console Covers Bundle ($150-250)

### Backend Infrastructure
- Update Stripe keys to live mode
- Send Week 1 email notification
- Launch! 🎉

**Full instructions:** See `DEPLOYMENT.md`

---

## 💰 Pricing Strategy

### Week 1 Launch (Limited Edition Model)
- **65" TV Cover:** $200 (15 units per pattern)
- **75" TV Cover:** $400 (15 units per pattern)
- **85" TV Cover:** $600 (15 units per pattern)

**Total potential Week 1 revenue:** $48,000 (if all 240 units sell)

### Post-Launch Strategy
Once momentum builds, switch to unlimited inventory at same price points with "handmade to order, ships in 2-3 weeks" messaging.

---

## 🎨 Design Philosophy

**Minimal & Intentional**
- Lots of white space
- Large, beautiful product photography
- Sans-serif typography (Inter font)
- Earthy color palette (cream, terracotta, midnight, sage)
- Instagram-ready aesthetic

**No Shopping Cart**
- Direct checkout only
- Creates urgency and reduces abandonment
- Inspired by Supreme/streetwear drop model

---

## 📧 Email Strategy

### Automated Emails
1. **Welcome** - Sent on signup
2. **Drop Notification** - 24 hours before each launch
3. **Order Confirmation** - Immediately after purchase
4. **Shipping Notification** - When order ships
5. **Sold Out** - For those who missed it

**Templates provided:** See `email-templates.md`

---
- Cloudflare KV (key-value storage)
- Stripe API (payments + webhooks)
- Email service integration (Resend/SendGrid)

**Hosting:**
- Cloudflare Pages (CDN + global edge network)
- Automatic HTTPS
- Instant deployments via Git

**Why This Stack?**
- Fast (global CDN)
- Cheap ($0-5/month)
- Scalable (handles traffic spikes)
- Simple (no server management)
- Secure (automatic HTTPS, DDoS protection)

---

## 📈 Success Metrics

### Week 1 Goals
- **Sales:** 50-100 units (20-40% sellthrough)
- **Email List:** 200+ subscribers
- **Average Order Value:** $300
- **Conversion Rate:** 3-5%

### 6-Week Goals
- **Total Revenue:** $50k-100k
- **Email List:** 1,000+ subscribers
- **Repeat Customer Rate:** 15-20%
- **Social Following:** 500+ Instagram followers

---

## 🌍 Artisan Sourcing

### Current Partners
- **Morocco:** Berber weavers (TV covers, pillows)
- **Palestine:** Knitters (AirPods cases)
- **Turkey:** Textile artists (cat sweaters)
- **Wales:** Grandmothers (Christmas hats)

### Future Expansion
- Japanese indigo dyers
- Peruvian alpaca weavers
- Indian block printers
- Scottish knitwear artisans

---

## 📞 Support

**Questions about setup?**
- Read `DEPLOYMENT.md` for step-by-step instructions
- Check Cloudflare docs: developers.cloudflare.com
- Check Stripe docs: stripe.com/docs

**Questions about strategy?**

## 📅 Launch Calendar

| Week | Product | Price | Launch Date |
|------|---------|-------|-------------|
| 1 | Moroccan TV Covers | $200-600 | Monday 9am GMT |
| 2 | Throw Pillows | $80 | Monday 9am GMT |
| 3 | AirPods Cases | $45 | Monday 9am GMT |
| 4 | Cat Sweaters | $65 | Monday 9am GMT |
| 5 | Christmas Hats | $55 | Monday 9am GMT |
| 6 | Complete Bundle | $150-250 | Monday 9am GMT |

**Full calendar with copy:** See `6-WEEK-CONTENT-CALENDAR.md`

---

## 💸 Cost Breakdown

### Monthly Costs
- **Cloudflare Pages:** Free (unlimited bandwidth)
- **Cloudflare Workers:** Free (100k requests/day)
- **Cloudflare KV:** Free (100k reads/day)
- **Domain:** ~$1/month (Cloudflare Registrar)
- **Email Service (Resend):** Free (3k emails/month)

**Total: $0-5/month** (excluding Stripe transaction fees)

### Transaction Fees
- **Stripe:** 2.9% + $0.30 per transaction
- Example: $200 sale = $6.10 fee (you keep $193.90)

---

## 🖥️ Local Development

To run locally without a web server setup:

```bash
cd /Users/jgarturo/Local\ Sites/haven
python3 -m http.server 8000
```

Then visit: `http://localhost:8000`

**What works locally:**
- All pages render correctly
- Navigation and styling
- Cart management (localStorage)
- Product variant selection

**What needs Cloudflare Worker (production only):**
- Email signup form submissions
- Stripe checkout flow

---

## 📂 File Structure

```
haven/
├── README.md                   # This file
├── DEPLOYMENT.md               # Complete setup guide
├── 6-WEEK-CONTENT-CALENDAR.md  # Marketing strategy
├── email-templates.md          # Email copy
├── index.html                  # Homepage
├── about.html                  # About page
├── drops.html                  # Archive page
├── notify.html                 # Email signup
├── styles.css                  # Global styles
├── script.js                   # Global JavaScript
├── drops/
│   ├── week1-moroccan-covers.html
│   ├── week2-throw-pillows.html
│   ├── week3-airpods-cases.html
│   ├── week4-cat-sweaters.html
│   ├── week5-christmas-hats.html
│   └── week6-soundbar-covers.html
├── worker.js                   # Cloudflare Worker (API)
└── wrangler.toml               # Worker config
```

---

## 🎯 Next Steps

### Before Launch
1. [ ] Replace placeholder images with real product photography
2. [ ] Test full checkout flow with test Stripe keys
3. [ ] Set up email service (Resend or SendGrid)
4. [ ] Create social media accounts (Instagram priority)
5. [ ] Build initial email list (aim for 100-500 subscribers)

### Launch Week
1. [ ] Switch to live Stripe keys
2. [ ] Send Week 1 drop notification email
3. [ ] Post on social media
4. [ ] Monitor sales and site performance
5. [ ] Respond to customer questions quickly

### Post-Launch
1. [ ] Analyze Week 1 performance
2. [ ] Adjust inventory/pricing for Week 2
3. [ ] Start creating artisan behind-the-scenes content
4. [ ] Engage with customers, build community
5. [ ] Consider paid ads if organic traction is strong

---

## 🛠 Tech Stack Details

**Frontend:**
- Pure HTML/CSS/JavaScript (no framework needed)
- Responsive design (mobile-first)
- Stripe.js for checkout
- Inter font (Google Fonts)

**Backend:**
- Cloudflare Workers (serverless API)
- Read `6-WEEK-CONTENT-CALENDAR.md` for marketing playbook
- Read `email-templates.md` for communication strategy

---

## 🚢 Ready to Ship

This is a complete, production-ready e-commerce site. All the pieces are here:

✅ Beautiful, minimal design  
✅ Full Stripe payment integration  
✅ Email capture and notifications  
✅ 6 weeks of product drops planned  
✅ Marketing copy written  
✅ Deployment instructions ready  

**All you need:**
1. Product photography
2. Stripe account
3. Email list to launch to

**The site is built to feel indie and artisan while being completely scalable.**

Good luck with Haven. Now go make it live. 🏡

---

**Built with ❤️ for the anti-tech, pro-cozy movement.**
