import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
//import { Button, Input } from "antd";
import React, { useState } from "react";
import axios from "axios";

function PaymentStripe() {
  
  // collect data from the user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [priceId, setPriceId] = useState("");
  
  // stripe items
  const stripe = useStripe();
  const elements = useElements();

  // main function
  const createSubscription = async () => {
    try {
      
      // create a payment method
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: elements?.getElement(CardElement),
        billing_details: {
          name,
          email,
        },
      });

      // call the backend to create subscription
        const response = await axios.post("http://localhost:3000/pay/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod: paymentMethod?.paymentMethod?.id,
          name,
          email,
          priceId
        }),
      });
      

      const confirmPayment = await stripe?.confirmCardPayment(
        response.clientSecret
      );

      if (confirmPayment?.error) {
        alert(confirmPayment.error.message);
      } else {
        alert("Success! Check your email for the invoice.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input  // this should not be a text field. maybe a radio button ro something
        placeholder="Price Id"
        type="text"
        value={name}
        onChange={(e) => setPriceId(e.target.value)}
      />
      <input
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <CardElement />

      <button onClick={createSubscription} disabled={!stripe}>
        Subscribe
      </button>
    </div>
  );
}

export default PaymentStripe;