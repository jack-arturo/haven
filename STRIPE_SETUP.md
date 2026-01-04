# Stripe Setup Guide for Haven

## Overview
This guide walks you through connecting Haven to Stripe for payment processing. We're using Stripe Checkout for a seamless, hosted payment experience.

## Step 1: Create a Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Click "Start now" and create an account
3. Complete the account verification process
4. Navigate to the Dashboard

## Step 2: Get Your API Keys

1. In the Stripe Dashboard, go to **Developers** > **API Keys**
2. You'll see two keys:
   - **Publishable Key** (starts with `pk_test_` for testing, `pk_live_` for production)
   - **Secret Key** (starts with `sk_test_` for testing, `sk_live_` for production)
3. Copy both keys - you'll need them

## Step 3: Configure Environment Variables

### For Local Testing (Development)

1. Create a `.env.local` file in your project root:
```
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_SECRET_KEY
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_TEST_PUBLISHABLE_KEY
SITE_URL=http://localhost:8000
```

2. Replace `YOUR_TEST_SECRET_KEY` and `YOUR_TEST_PUBLISHABLE_KEY` with your actual test keys from Stripe

### For Cloudflare Pages Deployment

1. Go to your Cloudflare Pages project settings
2. Navigate to **Environment variables**
3. Add these variables:
   - **Name:** `STRIPE_SECRET_KEY`
   - **Value:** Your Stripe secret key (production or test)
   - **Environment:** Production or Preview as needed
4. Repeat for `SITE_URL` (set to your actual domain, e.g., `https://havencollection.com`)

## Step 4: Update wrangler.toml

Update the `wrangler.toml` file with your Stripe keys:

```toml
[env.production.vars]
STRIPE_SECRET_KEY = "sk_live_YOUR_PRODUCTION_KEY"
SITE_URL = "https://yourdomain.com"

[env.staging.vars]
STRIPE_SECRET_KEY = "sk_test_YOUR_TEST_KEY"
SITE_URL = "https://staging.yourdomain.com"
```

## Step 5: Test Stripe Checkout

### Using Test Mode
Stripe provides test card numbers for testing:

- **Successful payment:** `4242 4242 4242 4242`
- **Declined payment:** `4000 0000 0000 0002`
- **Requires authentication:** `4000 0025 0000 3155`

Use any future date for expiry and any 3-digit number for CVC.

### Testing Workflow
1. Add items to cart on your local site
2. Click "Proceed to Checkout"
3. Use a test card number above
4. Complete the payment
5. You should be redirected to the success page

### Verify in Stripe Dashboard
1. Go to Stripe Dashboard > **Payments**
2. Look for your test payment in the list
3. Click on it to see details

## Step 6: Go Live

When you're ready to accept real payments:

1. In Stripe Dashboard, go to **Developers** > **API Keys**
2. Switch from "Viewing test data" to "Viewing live data"
3. Copy your **live** secret key (starts with `sk_live_`)
4. Update your Cloudflare Pages environment variables with the live key
5. Update your domain/site URL
6. Test with a small transaction using your actual card
7. Monitor your Stripe Dashboard for transactions

## Webhook Setup (Optional but Recommended)

For production, set up webhooks to handle post-payment events:

1. Go to **Developers** > **Webhooks** in Stripe Dashboard
2. Click "Add an endpoint"
3. Enter your endpoint URL: `https://yourdomain.com/api/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `charge.failed`
   - `charge.refunded`
5. Stripe will send you a signing secret - save this
6. Implement webhook handler in your backend to:
   - Send order confirmation emails
   - Update inventory
   - Log transactions

## Troubleshooting

### "Stripe key not configured" error
- Check that `STRIPE_SECRET_KEY` is set in environment variables
- Verify the key is not truncated or contains extra spaces
- Confirm you're using the Secret Key, not the Publishable Key

### Checkout fails silently
- Check browser console for JavaScript errors
- Verify the `/api/checkout` endpoint is responding
- Ensure cart items have valid prices

### Test payments don't appear
- Confirm you're viewing test data in Stripe Dashboard
- Check that you're using test card numbers (4242...)
- Verify the Stripe key you're using is a test key (sk_test_)

### "Invalid request" from Stripe API
- Check that line items are formatted correctly
- Verify all required fields are present
- Look at the error message in the Cloudflare function logs

## Security Checklist

- [ ] Never commit `.env` files with real keys to git
- [ ] Use environment variables for all sensitive data
- [ ] Rotate keys if they're ever exposed
- [ ] Use different keys for development, staging, and production
- [ ] Enable Stripe's webhook signatures for verification
- [ ] Validate all payment amounts server-side (don't trust client)
- [ ] Monitor your Stripe account for suspicious activity

## Support

- Stripe Documentation: https://stripe.com/docs
- Stripe API Reference: https://stripe.com/docs/api
- Stripe Support: https://support.stripe.com
