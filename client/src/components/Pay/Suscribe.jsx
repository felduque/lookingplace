import { loadStripe } from "@stripe/stripe-js"; //Stripe
import { Elements } from "@stripe/react-stripe-js"; //Stripe
import PaymentStripe from "./PaymentStripe.jsx";

export default function Suscribe() {
    const stripePromise = loadStripe("pk_test_51MXFdKJUzXedYgw5wofn9U6l7h7nx385Hf6xBPaYQTcOq6MeClSPpJbOGPfkcIsmmRS7C4DjKPH9A86hmv4Z37Zi0063Fm2lSM");

    return (
      <Elements stripe={stripePromise}>
        <PaymentStripe />
      </Elements>
    )
}