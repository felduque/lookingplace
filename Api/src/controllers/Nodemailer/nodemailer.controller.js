// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
import { tenantHtml } from "../../Templates/tenantHtml.js";
import { clientHtml } from "../../Templates/clientHtml.js";
import { payHtml } from "../../Templates/payHtml.js";
import { propertyHtml } from "../../Templates/propertyHtml.js";
// require("dotenv").config();
// const { NODEMAILER_PASS } = process.env;

export async function sendEmail(client, role, id) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.email",
    port: 587,
    auth: {
      user: "lookingplace.app.henry@gmail.com",
      pass: "lrzuyphbebplwmci",
    },
  });

  const urlValidation = "https://api.gmail.com/";
  var htmlSend;
  if (role === "Client") {
    htmlSend = clientHtml;
  } else if (role === "Tenant") {
    htmlSend = tenantHtml;
  }

  htmlSend = htmlSend?.replace("*fullName*", client.fullName);
  //   htmlSend = htmlSend?.replace("*lastname*", client.lastname);
  //   htmlSend = htmlSend?.replace("*message*", client.message);

  const info = await transporter.sendMail(
    {
      from: "<lookingplace.app.henry@gmail.com>", // cual es el email que esta enviando el correo ( por lo general el de la empresa info@...)
      to: `${client.email}`, // lista o persona a la que le queremos enviar el correo
      subject: `Hola ${client.fullName}, Bienvenido a LookingPlace. Gracias por suscribirte!`, // Asunto
      html: htmlSend,
    },
    (error, info) => {
      if (error) {
        return "Error";
      }
      console.log("send email");
    }
  );
  return;
}

export async function sendEmailPay(fullName, email, priceTotal, title) {
  // console.log("NODEMAILER", fullName, email, priceTotal, title);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.email",
    port: 587,
    auth: {
      user: "lookingplace.app.henry@gmail.com",
      pass: "lrzuyphbebplwmci",
    },
  });

  // console.log("cree Transporte");

  var htmlSend = payHtml;

  htmlSend = htmlSend?.replace("*fullName*", fullName);
  htmlSend = htmlSend?.replace("*title*", title);
  htmlSend = htmlSend?.replace("*priceTotal*", priceTotal);
  //   htmlSend = htmlSend?.replace("*lastname*", client.lastname);
  //   htmlSend = htmlSend?.replace("*message*", client.message);

  let mailOptions = {
    from: "<lookingplace.app.henry@gmail.com>",
    to: email,
    subject: `Hola ${fullName}, LookingPlace : Pago Realizado con Exito!`,
    html: htmlSend,
  };

  await transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
      return "Error";
    }
    console.log("send email");
  });
  return;
}

export async function sendEmailProperty (property, fullName, email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.email",
    port: 587,
    auth: {
      user: "lookingplace.app.henry@gmail.com",
      pass: "lrzuyphbebplwmci"
    },
  });

	const urlValidation = "https://api.gmail.com/"
  var htmlSend = propertyHtml;

  htmlSend = htmlSend?.replace("*fullName*", fullName);


  const info = await transporter.sendMail(
    {
      from: "<lookingplace.app.henry@gmail.com>", // cual es el email que esta enviando el correo ( por lo general el de la empresa info@...)
      to: `${email}`, // lista o persona a la que le queremos enviar el correo
      subject: `Hola ${fullName}, ha publicado una nueva propiedad`, // Asunto
      html: htmlSend,
    },
    (error, info) => {
      if (error) {
        return "Error";
      }
      console.log("send email");
    }
  );
  return;
};


