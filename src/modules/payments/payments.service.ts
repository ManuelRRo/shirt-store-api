import { Injectable, RawBodyRequest } from '@nestjs/common';
import { AppService } from 'src/app.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  stripe;
  constructor(private readonly appService: AppService) {
    this.stripe = new Stripe(this.appService.configStripeSecret() as string, {
      typescript: true,
    });
  }

  async createPaymentIntent(): Promise<string | null> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: 1099,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });
      const jsonString = JSON.stringify(paymentIntent.client_secret);
      return jsonString;
    } catch (error) {
      console.error('Error creating PaymentIntent:', error);
      throw new Error('Failed to create PaymentIntent');
    }
  }

  async webhooksEvent(req: RawBodyRequest<Request>) {
    const signature = req.headers['stripe-signature'] as string;
    const payload = req.rawBody as Buffer;

    // try {
    const event = await this.stripe.webhooks.constructEvent(
      payload,
      signature,
      this.appService.configWebhookSecret() as string,
    );
    // } catch (err) {
    //   throw new Error(
    //     `⚠️  Webhook signature verification failed.`,
    //     err.message,
    //   );
    // }

    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log(`PaymentIntent for  was successful!`);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case 'payment_method.attached':
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
  }
}
