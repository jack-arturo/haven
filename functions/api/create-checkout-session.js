export async function onRequestPost(context) {
    const { request, env } = context;

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    try {
        const body = await request.json();
        const { product, pattern, size, price } = body;

        const productName = `Moroccan TV Cover - ${pattern} - ${size}"`;

        // Create Stripe checkout session using fetch (no SDK needed)
        const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'payment_method_types[0]': 'card',
                'line_items[0][price_data][currency]': 'usd',
                'line_items[0][price_data][product_data][name]': productName,
                'line_items[0][price_data][product_data][description]': 'Handwoven by Atlas Mountain artisans. Limited edition.',
                'line_items[0][price_data][unit_amount]': (price * 100).toString(),
                'line_items[0][quantity]': '1',
                'mode': 'payment',
                'success_url': 'https://haven.autojack.ai/success.html?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url': 'https://haven.autojack.ai/drops/week1-moroccan-covers.html',
                'metadata[product]': product,
                'metadata[pattern]': pattern,
                'metadata[size]': size,
                'shipping_address_collection[allowed_countries][0]': 'US',
                'shipping_address_collection[allowed_countries][1]': 'GB',
                'shipping_address_collection[allowed_countries][2]': 'CA',
                'shipping_address_collection[allowed_countries][3]': 'AU',
            })
        });

        const session = await stripeResponse.json();

        if (session.error) {
            return new Response(JSON.stringify({ error: session.error.message }), {
                status: 400,
                headers: corsHeaders
            });
        }

        return new Response(JSON.stringify({ id: session.id }), {
            headers: corsHeaders
        });

    } catch (error) {
        console.error('Checkout error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: corsHeaders
        });
    }
}

export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}
