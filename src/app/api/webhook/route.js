import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);

    return new Response("Webhook Error", {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    const order = {
      stripeSessionId: session.id,

      customer: {
        name: session.customer_details?.name,
        email: session.customer_details?.email,
      },

      shippingAddress: session.collected_information?.shipping_details?.address,

      items: lineItems.data.map((item) => ({
        name: item.description,
        quantity: item.quantity,
        amount: item.amount_total,
      })),

      total: session.amount_total,
      currency: session.currency,

      paymentStatus: session.payment_status,
      createdAt: new Date().toISOString(),
    };

    console.log("✅ New order:", order);
  }

  return Response.json({
    received: true,
  });
}
