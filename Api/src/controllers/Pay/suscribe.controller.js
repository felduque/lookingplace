//Clave Secreta de prueba
import stripe from 'stripe';
const stripe_accs = stripe("sk_test_51MXFdKJUzXedYgw51LZqfnZyaqn3Vbe2ukdsscxVi4tS8OmHy0JTMbFuShCyNGfYWutQM7882ZKZIgswGdseZROG005msUuZV8");

export const createSubscription = async (req, res) => {
  const { name, email, paymentMethod } = req.body;
    // create a stripe customer
    const customer = await stripe_accs.customers.create({
      name: name,
      email: email,
      payment_method: paymentMethod,
      invoice_settings: {
        default_payment_method: paymentMethod,
      },
    });
  
  
    // get the price id from the front-end
    const priceId = req.priceId;
  
    // create a stripe subscription
    const subscription = await stripe_accs.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_settings: {
        payment_method_options: {
          card: {
            request_three_d_secure: 'any',
          },
        },
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
    });
  
    // return the client secret and subscription id
    return {
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      subscriptionId: subscription.id,
    };
  }