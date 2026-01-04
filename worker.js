// Cloudflare Worker for Haven Stripe Integration
// Deploy this as a Cloudflare Worker and connect to your Pages site

import Stripe from 'stripe';

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        
        // Initialize Stripe with secret key from environment
        const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
            apiVersion: '2023-10-16'
        });

        // CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        };

        // Handle OPTIONS request for CORS
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        // Route: Create Stripe Checkout Session
        if (url.pathname === '/api/create-checkout-session' && request.method === 'POST') {
            try {
                const body = await request.json();
                const { product, pattern, size, price } = body;

                // Product SKU mapping (you'll need to create these in Stripe Dashboard)
            } catch (error) {
                console.error('Stripe error:', error);
                return new Response(JSON.stringify({ error: error.message }), {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        // Route: Stripe Webhook Handler
        if (url.pathname === '/api/stripe-webhook' && request.method === 'POST') {
            const signature = request.headers.get('stripe-signature');
            const body = await request.text();

            try {
                const event = stripe.webhooks.constructEvent(
                    body,
                    signature,
                    env.STRIPE_WEBHOOK_SECRET
                );

                // Handle successful payment
                if (event.type === 'checkout.session.completed') {
                    const session = event.data.object;
                    
                    // Store order in your database (KV or D1)
                    await env.ORDERS_KV.put(session.id, JSON.stringify({
                        id: session.id,
                        customer_email: session.customer_details.email,
                        amount: session.amount_total,
                        product: session.metadata.product,
                        pattern: session.metadata.pattern,
                        size: session.metadata.size,
                        shipping: session.shipping_details,
                const productName = `Moroccan TV Cover - ${pattern} - ${size}"`;
                
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: [{
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: productName,
                                description: `Handwoven by Atlas Mountain artisans. Limited edition.`,
                                images: ['https://your-domain.com/images/moroccan-cover.jpg'], // Replace with actual image
                            },
                            unit_amount: price * 100, // Stripe uses cents
                        },
                        quantity: 1,
                    }],
                    mode: 'payment',
                    success_url: `${env.SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${env.SITE_URL}/drops/week1-moroccan-covers.html`,
                    metadata: {
                        product,
                        pattern,
                        size
                    },
                    shipping_address_collection: {
                        allowed_countries: ['US', 'GB', 'CA', 'AU', 'EU']
                    }
                });

                return new Response(JSON.stringify({ id: session.id }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
                        created_at: new Date().toISOString(),
                        status: 'paid'
                    }));

                    // Send order confirmation email (integrate with Resend, SendGrid, etc.)
                    await sendOrderConfirmation(session.customer_details.email, session);
                }

                return new Response(JSON.stringify({ received: true }), {
                    headers: { 'Content-Type': 'application/json' }
                });

            } catch (error) {
                console.error('Webhook error:', error);
                return new Response(JSON.stringify({ error: error.message }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }

        // Route: Subscribe to email list
        if (url.pathname === '/api/subscribe-email' && request.method === 'POST') {
            try {
                const { email } = await request.json();
                
                // Store email in KV
                await env.EMAILS_KV.put(email, JSON.stringify({
                    email,
                    subscribed_at: new Date().toISOString(),
                    status: 'active'
                }));

                // Optional: Send welcome email
                
                return new Response(JSON.stringify({ success: true }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });

            } catch (error) {
                console.error('Email subscription error:', error);
                return new Response(JSON.stringify({ error: error.message }), {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        return new Response('Not Found', { status: 404 });
    }
};

// Helper function to send order confirmation email
async function sendOrderConfirmation(email, session) {
    // Integrate with your email provider (Resend, SendGrid, etc.)
    // Example with Resend:
    /*
    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: 'Haven <hello@haven.store>',
            to: email,
            subject: 'Your Haven Order Confirmation',
            html: `
                <h1>Thank you for your order!</h1>
                <p>Your ${session.metadata.pattern} Moroccan TV Cover (${session.metadata.size}") is being handwoven by our artisans.</p>
                <p>Expected delivery: 2-3 weeks</p>
                <p>Order ID: ${session.id}</p>
            `
        })
    });
    */
    console.log('Order confirmation email would be sent to:', email);
}
