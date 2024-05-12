import { mongooseConnect } from "@/lib/mongoose";
import Stripe from "stripe";
import {buffer} from 'micro';
import Order from "@/models/Order";
// import {headers } from 'next/headers';
// import { buffer } from 'node:stream/consumers';

const stripe = new Stripe(process.env.STIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET

export default async function webhookHandler(req, res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];
  const rawBody = await buffer(req);
  
  let event;
  
  try { 
    console.log('try block')
    console.log(sig, endpointSecret, rawBody);

    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    console.log('event', event)
  } catch (err) {
    console.log('there was an error', err.message)
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  console.log('before switch');
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      console.log('this should be Data and orderId', data)
      if(orderId && paid){
        await Order.findByIdAndUpdate(orderId, {paid: true})
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send('ok');
}

export const config = {
  api: {bodyParser: false}
}