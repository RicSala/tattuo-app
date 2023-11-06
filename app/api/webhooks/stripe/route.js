import prisma from "@/lib/prismadb";
import { getStripeInstance } from "@/lib/stripe";
import { config } from "@/config/shipper.config";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const stripe = await getStripeInstance();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const body = await request.text();
  const headersList = headers();
  const signature = headersList.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Could verify signature" },
      { status: 500 },
    );
  }

  console.log(event.type);
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const sessionId = event.data.object.id;
        console.log(event.data.object);
        console.log({ sessionId });
        const stripe = await getStripeInstance();
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        });
        console.log("this", session);
        const customerId = session?.customer;
        const productId = session?.line_items?.data[0]?.price.product;
        const priceId = session?.line_items?.data[0]?.price.id;
        const userId = session.client_reference_id;
        const userEmail = session.customer_details.email;
        const userName = session.customer_details.name;
        const plan = config.productIds.find((p) => p === productId);
        // If subscription:
        // const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
        // TODO: why do we need to "retrieve" instead of just use dot notation??

        if (!plan) {
          console.log("no se encuentra producto");
          break;
        }

        console.log({ plan });
        console.log({ userId });
        if (!userId && !userEmail) {
          console.log("no se encuentra usuario");
          break;
        }

        let user;

        if (userId) {
          // with prisma, find the user with id = userId
          user = await prisma.user.findUnique({
            where: {
              id: userId,
            },
          });
        } else if (userEmail) {
          // with prisma, create a new user iwth email = userEmail and name = userName
          user = await prisma.user.create({
            data: {
              email: userEmail,
              name: userName,
            },
          });
        }

        console.log({ user });

        // TODO: More business logic could be necesary (one off payments vs subscriptins, monthly vs yearly, credit systems...)

        // save it in the database
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            priceId: priceId,
            productId: productId,
            customerId: customerId,
            // For subscription: stripeCurrentPeriodEnd: newDate(subscription.current_period_end*1000)
          },
        });

        console.log("SUCCESS!!!");
      }

      case "invoice.payment_succeeded": {
        // update the user priceId and stripeCurrentPeriodEnd
        // where the stripesubscription of the user in the databaes matches subscription.id
      }
      case "customer.created": {
        const session = event.data.object;
        // console.log({ session })
      }
      case "charge.succeeded": {
        const session = event.data.object;
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something failed while updating plan on DB" },
      { status: 500 },
    );
  }

  return NextResponse.json(null, { status: 200 });
}

export const StripeWebhooks = {
  AsyncPaymentSuccess: "checkout.session.async_payment_succeeded",
  Completed: "checkout.session.completed", // TODO: Check what each event means exactly...
  PaymentFailed: "checkout.session.async_payment_failed",
  SubscriptionDeleted: "customer.subscription.deleted",
  SubscriptionUpdated: "customer.subscription.updated",
};
