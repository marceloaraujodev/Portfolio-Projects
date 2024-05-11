import { mongooseConnect } from "@/lib/mongoose";
import Stripe from "stripe";
import {buffer} from 'micro';

// const stripe = new Stripe(process.env.STIPE_SECRET_KEY)
const stripe = require('stripe')(process.env.STIPE_SECRET_KEY)
const endpointSecret = "";
console.log('enter')

export default async function webhookHandler(req, res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    console.log('try block')
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    console.log('event', event)
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  console.log('before switch');
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const data = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      console.log('this should be Data and orderId', data)
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

}

export const config = {
  api: {bodyParser: false}
}