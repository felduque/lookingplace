import { useEffect } from "react";

export default function MPButton({ title, description, price }) {
  const dataPropClien = {
    property: {
      title: title,
      description: description,
      price: price,
    },
    client: {
      name: "Joe",
      surname: "JG",
      email: "joel@hotmail.com",
    },
  };

  useEffect(() => {
    // The async function is needed since we can't do async stuff in the top level of our useEffect
    const fetchCheckout = async () => {
      const res = await fetch("http://localhost:3000/checkOut/pagoProperty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPropClien),
      });
      const data = await res.json();
      console.log(data.body.id);

      // data.global is the ID that MP returns from the API, it comes from our backend route
      if (data) {
        const script = document.createElement("script"); // Here we create the empty script tag
        script.type = "text/javascript"; // The type of the script
        script.src = "https://sdk.mercadopago.com/js/v2"; // The link where the script is hosted
        script.setAttribute("data-preference-id", data.body.id); // Here we set its data-preference-id to the ID that the Mercado Pago API gives us
        document.body.appendChild(script); // Here we append it to the body of our page

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore

        // Here we create the button, setting the container, our public key and the ID of the preference that Mercado Pago API returns in its response

        const mp = await new MercadoPago(
          "TEST-137b6be0-b064-4d95-98b8-077723d4ebb1",
          {
            locale: "es-PE",
          }
        );

        // The ".checkout" is the function that creates the connection between the button and the platform

        mp.checkout({
          preference: {
            id: data.body.id,
          },
          render: {
            container: ".cho-container",
            label: "Rentar Alojamiento",
          },
          theme: {
            elementsColor: "#3D8C00",
          },
        });
      }
    };

    setTimeout(() => {
      fetchCheckout();
    }, 0);
  }, []);

  return <div className="cho-container"></div>;
}
