import React, { useState } from "react";
import mercadopago from "mercadopago";

/*
Falta recibir ruta para ir probando
PUBLICK KEY API
TEST-74557cc6-1a1e-46fd-9671-943e1749032d
ACCESS TOKEN
TEST-6424521125341774-012814-f62fa7643333a3e11f2d09a1c7ae4802-350969416
PUBLICK KEY PRO
TEST-137b6be0-b064-4d95-98b8-077723d4ebb1
Access Token
TEST-2972272992436948-012819-2a80a6af95d80301b59beeceef162274-350969416
*/


export default function Payment() {
  const [clientId, setClientId] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [issuerId, setIssuerId] = useState("");
  const [token, setToken] = useState("");
  const [installments, setInstallments] = useState(1);
  const [payer, setPayer] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    mercadopago.setPublishableKey(clientId);

    try {
      const payment = await mercadopago.createPayment({
        transaction_amount: amount,
        description: description,
        payment_method_id: paymentMethodId,
        issuer_id: issuerId,
        token: token,
        installments: installments,
        payer: payer
      });

      // Realiza una acción dependiendo del estado del pago
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Client ID"
        value={clientId}
        onChange={(event) => setClientId(event.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <input
        type="text"
        placeholder="Payment Method ID"
        value={paymentMethodId}
        onChange={(event) => setPaymentMethodId(event.target.value)}
      />
      <input
        type="text"
        placeholder="Issuer ID"
        value={issuerId}
        onChange={(event) => setIssuerId(event.target.value)}
      />
      <input
        type="text"
        placeholder="Token"
        value={token}
        onChange={(event) => setToken(event.target.value)}
      />
      <input
        type="number"
        placeholder="Installments"
        value={installments}
        onChange={(event) => setInstallments(event.target.value)}
      />
      <button type="submit">Create Payment</button>
    </form>
  );
}
