import Stripe from 'stripe';

// TODO: implement singleton?
export async function getStripeInstance() {
  const key = process.env.STRIPE_SECRET_KEY;

  return new Stripe(key);
}

// This is the code for the createCheckout function for one-time payments (and save data for later of needed)
export const createCheckout = async ({
  user,
  clientReferenceID,
  successUrl,
  cancelUrl,
  priceId,
  couponId,
}) => {
  const stripe = await getStripeInstance();

  const userParam = {};

  if (user?.customerId) {
    userParam.customer = user.customerId;
  } else {
    userParam.customer_creation = 'always';

    if (user?.email) {
      userParam.customer_email = user.email;
    }
  }

  const stripeSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    ...userParam,
    allow_promotion_codes: true,
    invoice_creation: { enabled: true },
    client_reference_id: clientReferenceID,
    payment_intent_data: { setup_future_usage: 'on_session' },
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    discounts: couponId
      ? [
          {
            coupon: couponId,
          },
        ]
      : [],
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return stripeSession.url;
};
