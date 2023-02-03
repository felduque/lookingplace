import mercadopago from "mercadopago";

const TOKEN_KEY = "TEST-6424521125341774-012814-f62fa7643333a3e11f2d09a1c7ae4802-350969416";

// Agrega credenciales
mercadopago.configure({
  access_token: TOKEN_KEY,
});

let preference = {};

export default function checkoutMP(product, price, quantity) {
// Crea un objeto de preferencia
  preference = {
    items: [
      {
        title: product,
        unit_price: price,
        quantity: quantity,
      },
    ],
  };
  mercadopago.preferences
  .create(preference)
  .then(function (response) {
    // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
  })
  .catch(function (error) {
    console.log(error);
  });
}




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