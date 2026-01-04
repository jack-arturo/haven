// Stripe Checkout Handler for Cloudflare Pages Functions
// This runs on the Cloudflare Edge

export async function onRequest(context) {
    // Only POST requests
    if (context.request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const { items } = await context.request.json();

        if (!items || !Array.isArray(items) || items.length === 0) {
            return new Response(
                JSON.stringify({ error: 'No items in cart' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Get Stripe API key from environment
        const stripeKey = context.env.STRIPE_SECRET_KEY;
        if (!stripeKey) {
            return new Response(
                JSON.stringify({ error: 'Stripe key not configured' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Build line items for Stripe
        const lineItems = items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: `${item.name} - ${item.size}"`,
                    description: `Haven TV Cover`
                },
                unit_amount: Math.round(item.price * 100) // Convert to cents
            },
            quantity: 1
        }));

        // Create Stripe Checkout Session
        const session = await createCheckoutSession(
            stripeKey,
            lineItems,
            context.env.SITE_URL || 'https://haven.example.com'
        );

        return new Response(
            JSON.stringify({ sessionId: session.id }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (error) {
        console.error('Checkout error:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

async function createCheckoutSession(stripeKey, lineItems, siteUrl) {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${stripeKey}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'payment_method_types[]': 'card',
            'mode': 'payment',
            'success_url': `${siteUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            'cancel_url': `${siteUrl}/cart.html`,
            ...buildLineItemsFormData(lineItems)
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Stripe API error: ${error}`);
    }

    return await response.json();
}

function buildLineItemsFormData(lineItems) {
    const formData = {};
    lineItems.forEach((item, index) => {
        formData[`line_items[${index}][price_data][currency]`] = item.price_data.currency;
        formData[`line_items[${index}][price_data][product_data][name]`] = item.price_data.product_data.name;
        formData[`line_items[${index}][price_data][unit_amount]`] = item.price_data.unit_amount;
        formData[`line_items[${index}][quantity]`] = item.quantity;
    });
    return formData;
}
