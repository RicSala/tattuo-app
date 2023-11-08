// // This is how it's done here: https://vercel.com/guides/getting-started-with-nextjs-typescript-stripe

// import { loadStripe } from "@stripe/stripe-js";

// // Singleton pattern to create/retrieve the Stripe instance:
// let stripePromise;
// const getStripe = () => {
//   if (!stripePromise) {
//     stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
//   }
//   return stripePromise;
// };

// export default getStripe;

// // If you prefer to delay loading of Stripe.js until Checkout, you can import {loadStripe} from '@stripe/stripe-js/pure';

// // Create Checkout Sessions from body params.
// // this is supposed to be in an api handler
// const params = {
//   submit_type: "donate",
//   payment_method_types: ["card"],
//   line_items: [
//     {
//       name: "Custom amount donation",
//       amount: formatAmountForStripe(amount, CURRENCY),
//       currency: CURRENCY,
//       quantity: 1,
//     },
//   ],
//   success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
//   cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
// };

// const checkoutSession = await stripe.checkout.sessions.create(params);

// // this component is supposed to be used in a page

// // Partial of ./components/CheckoutForm.tsx
// // ...
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   // Create a Checkout Session by calling the api we just created
//   const checkoutSession = await fetchPostJSON("/api/checkout_sessions", {
//     amount: input.customDonation,
//   });

//   // if there is an error creating the checkout, return and console.log the message
//   if (checkoutSession.statusCode === 500) {
//     console.error(checkoutSession.message);
//     return;
//   }

//   // Otherwise, get stripe and...
//   const stripe = await getStripe();
//   // redirecto to checkout page using the session
//   const { error } = await stripe.redirectToCheckout({
//     // Make the id field from the Checkout Session creation API response
//     // available to this file, so you can provide it as parameter here
//     // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
//     sessionId: checkoutSession.id,
//   });
//   // If `redirectToCheckout` fails due to a browser or network
//   // error, display the localized error message to your customer
//   // using `error.message`.
//   console.warn(error.message);
// };
// // ...

// // WEBHOOKS
// // to get notified about events that happen on your Stripe account. This is especially useful for asynchronous payments, subscriptions with Stripe Billing

// // ### THIS IS ANOTHER API ROUTE
// // Partial of ./pages/api/webhooks/index.ts

// import Cors from "micro-cors";

// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// // Stripe requires the raw body to construct the event, so at the API route we need to disable bodyParser
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const webhookHandler = async (req, res) => {
//   if (req.method === "POST") {
//     // as bodyParser is disabled, we need to retrieve the raw body
//     const buf = await buffer(req);
//     // we get the stripe signature sent in the request header
//     const sig = req.headers["stripe-signature"];

//     let event;

//     try {
//       // and we construct the event with the raw body and signature usig our webhook secret
//       event = stripe.webhooks.constructEvent(
//         buf.toString(),
//         sig,
//         webhookSecret,
//       );
//     } catch (err) {
//       // On error, log and return the error message
//       console.log(`❌ Error message: ${err.message}`);
//       res.status(400).send(`Webhook Error: ${err.message}`);
//       return;
//     }

//     // Successfully constructed event
//     console.log("✅ Success:", event.id);
//   }
// };

// // ...
// // By default, Next.js API routes are same-origin only. To allow Stripe webhook event requests to reach your API route, add micro-cors:
// // we allow POST and HEAD requests from any origin to reach our API route
// const cors = Cors({
//   allowMethods: ["POST", "HEAD"],
// });

// // We wrap the webhook handler with cors so the micro cors is applied to the endpoint
// // TODO: export default cors(webhookHandler);
// export const corsTest = cors(webhookHandler);
