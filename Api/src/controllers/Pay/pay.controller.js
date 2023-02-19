// const mercadopago = import("mercadopago");
import mercadopago from "mercadopago";
import { sendEmailPay } from "../Nodemailer/nodemailer.controller.js";

mercadopago.configure({
  access_token:
    // USUARIO DE PRUEBA, CRED DE PROD
    "APP_USR-7093203553956018-021319-da934253043f73fa0fbbc4cae73616d7-1309803015",
  //DE USUARIO NORMAL PERO CON CRED DE PRUEBA
  // "TEST-2972272992436948-012819-2a80a6af95d80301b59beeceef162274-350969416",
});

export const paySuscription = async (req, res) => {
  const prod = req.body;
  console.log(prod);
  let preference = {
    items: [
      {
        title: prod.title,
        description: prod.description,
        picture_url: prod.url,
        category_id: prod.category,
        unit_price: Number(prod.price),
        quantity: Number(prod.quantity),
      },
    ],
    payer: {
      name: "Prueba1",
      email: "prueba1@gmail.com",
      phone: {
        area_code: "11",
        number: 123456789,
      },
      identification: {
        number: "12345678",
        type: "DNI",
      },
      address: {
        zip_code: "1111",
        street_name: "False",
        street_number: 123,
      },
    },
    back_urls: {
      success: "http://localhost:5173/",
      failure: "http://localhost:5173/",
      pending: "http://localhost:5173/",
    },
    auto_return: "approved",
    // pagos que se solucionan en el momento
    binary_mode: true,
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      return res.status(404).send(error);
    });
};

// --------------------------------------------
export const payProperty = async (req, res) => {
  const { property, client } = req.body;
  console.log(property, client);

  let preference = {
    binary_mode: true,
    items: [
      {
        id: Number(property.id),
        title: property.title,
        description: property.description,
        picture_url: property.picture_url,
        // category_id: prod.category,
        unit_price: Number(property.price),
        quantity: 1,
      },
    ],
    payer: {
      // id: client.id,
      name: JSON.stringify(client.id),
      // surname: client.surname,
      email: client.email,
      // phone: {
      //   // area_code: "11",
      //   number: client.number,
      // },
      // identification: {
      //   number: "12345678",
      //   type: "DNI",
      // },
      // address: {
      //   zip_code: "1111",
      //   street_name: "False",
      //   street_number: 123,
      // },
    },
    back_urls: {
      success: "http://127.0.0.1:5173/Pay/Success",
      failure: "http://127.0.0.1:5173/Pay/Failure",
      pending: "http://127.0.0.1:5173/",
    },
    auto_return: "approved",
    // pagos que se solucionan en el momento
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      console.log(response);
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      return res.status(404).send(error);
    });
};

// -------------------------Envio de Mail

export const sendEmailFromPay = async (req, res) => {
  const { fullName, email, priceTotal, title } = req.body;
  console.log(fullName, email, priceTotal, title);
  try {
    await sendEmailPay(fullName, email, priceTotal, title);
    return res.status(200).send("Email enviado con exito");
  } catch (error) {
    return res.status(404).send(error);
  }
};
