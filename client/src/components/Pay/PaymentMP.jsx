import React, { useState } from "react";
import MercadoPago from "mercadopago";

const PaymentMP = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const PUBLIC_KEY = 'TEST-137b6be0-b064-4d95-98b8-077723d4ebb1';
  const ACCESS_TOKEN = 'TEST-2972272992436948-012819-2a80a6af95d80301b59beeceef162274-350969416';

  MercadoPago.setPublishableKey(PUBLIC_KEY);
  MercadoPago.setAccessToken(ACCESS_TOKEN);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const paymentData = {
        transaction_amount: amount,
        token: "",
        description: `Pago de ${amount} dólares`,
        installments: 1,
        payment_method_id: "",
        payer: {
          email: "",
        },
      };

      const response = await MercadoPago.payment.save(paymentData);

      if (response.status === 201) {
        alert("Pago realizado con éxito!");
      } else {
        throw new Error("Ocurrió un error al procesar el pago");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al procesar el pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
      />
      <button disabled={loading} onClick={handleCheckout}>
        {loading ? "Procesando pago..." : "Pagar"}
      </button>
    </div>
  );
};

export default PaymentMP;
