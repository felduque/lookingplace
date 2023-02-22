/**
 * TODO: RUTAS A CREAR
 * ! Post: crear client => nombre, email, password, verfy, avatar, rol: 1 -> client 2 -> admin
 * ! Post: login => email, password
 * ! Post: Registro port gmail
 * ! get: userinfo por id => id, nombre, email, avatar
 *
 */
import express from "express";
import { Aboutme } from "../../models/aboutme.model.js";
import { Client } from "../../models/client.model.js";
import { Tenant } from "../../models/tenant.model.js";
import { Property } from "../../models/property.model.js";
import { Booking } from "../../models/booking.model.js";
import { Comment } from "../../models/comment.model.js";
import bcrypt from "bcrypt";
const app = express();
import { createRequire } from "module";
import jwt from "jsonwebtoken";
import { sendEmail } from "../Nodemailer/nodemailer.controller.js";
// import { Payments } from "../../models/payment.model.js";
const require = createRequire(import.meta.url);
require("dotenv").config();
app.set("view engine", "ejs");
var nodemailer = require("nodemailer");

const secretjwt =
  "5e6fa1b1bfd5a93c5e7ae001e4c96794c0e8f004095074b42608dc3a0acb67574e2821518d6638eef13c9f882408c861f9cc09e603439e9a93aae6a2b9146e44";

export const createAboutme = async (req, res) => {
  const { description, hobbies, age, from, client_about, tenant_about } =
    req.body;
  try {
    let newAboutme = await Aboutme.create(
      {
        description,
        hobbies,
        age,
        from,
        client_about,
        tenant_about,
      },
      {
        includes: [
          {
            model: Client,
            as: "client_about",
            attributes: ["id"],
          },
          {
            model: Tenant,
            as: "tenant_about",
            attributes: ["id"],
          },
        ],
      }
    );
    if (newAboutme) {
      return res.json({
        message: "Aboutme created successfully",
        data: newAboutme,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something goes wrong",
      data: {},
    });
  }
};

export const createClient = async (req, res) => {
  const { firebaseUrl } = req.file ? req.file : "";

  const { fullName, email, password, verify, phone, role } = req.body;

  // ! Encrypt password
  const salt = await bcrypt.genSalt(10);
  const passwordCrypt = await bcrypt.hash(password, salt);
  try {
    //const searchPhone = await Client.findOne({ where: { phone } });
    const searchEmail = await Client.findOne({ where: { email } });
    if (searchEmail) return res.status(400).json({ message: "Email exists" });
    //if (searchPhone) return res.status(400).json({ message: "Phone exists" });

    let newClient = await Client.create(
      {
        fullName,
        email,
        password: passwordCrypt,
        verify,
        avatar: firebaseUrl,
        phone,
        role,
      }
      // relation aboutMe and create aboutme
      // {
      //   include: [
      //     {
      //       model: Aboutme,
      //       as: "aboutMe",
      //       attributes: ["id"],
      //     },
      //   ],
      // }
    );
    if (newClient) {
      sendEmail(newClient, role);
      return res.json({
        message: "Client created successfully",
        data: newClient,
        token: secretjwt,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error",
      data: {},
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Client.findOne({ where: { email } });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, secretjwt, {
      expiresIn: "15m",
    });

    const role = user.role;
    const avatar = user.avatar;
    const userId = user.id;
    const fullName = user.fullName;

    if (res.status(201)) {
      return res.json({
        status: "ok",
        data: token,
        role: role,
        avatar: avatar,
        userId: userId,
        fullName,
      });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
};

export const clientData = async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, secretjwt, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    Client.findOne({ where: { email: useremail } })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
};

//Post

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const forgot = async (req, res) => {
  const { email } = req.body;

  if (!validateEmail)
    return res.status(400).send({ message: "email no valido" });
  try {
    const oldUser = await Client.findOne({ where: { email } });
    if (!oldUser) {
      return res.status(400).json({ status: "No existe ese usuario" });
    }
    const secret = secretjwt + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
      expiresIn: "10m",
    });
    const link = `http://127.0.0.1:3000/client/reset/${oldUser.id}/${token}`;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "lookingplace.app.henry@gmail.com",
        pass: "lrzuyphbebplwmci",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: email,
      subject: "Password Reset",
      html: `
      <div style="border: 4px solid #0099CC; border-radius: 10px; padding: 20px; max-width: 500px; margin: auto; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.4; color: #333;">
        <div style="text-align: center;">
          <img src="https://thumbs2.imgbox.com/f0/b1/ukj3hkGl_t.jpg" alt="LookingPlace" style="max-width: 200px; height: auto;">
          <h1 style="color: #0099CC; font-size: 32px; margin: 10px 0;">LookingPlace</h1>
        </div>
        <p>Estimado ${email},</p>
        <p>Para recuperar su contraseña haga click en el siguiente boton:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${link}" style="background-color: #0099CC; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Recupere contraseña aqui</a>
        </div>
        <p style="text-align: center; font-size: 14px;">LookingPlace | 123 Main St | Ciudad, Estado | +1-234-567-8901</p>
      </div>
      `,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.error("Ha ocurrido un error:", err);
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json("El email para la recuperación ha sido enviado");
      }
    });

    console.log(link);
  } catch (error) {
    res.status(500).send({
      message: "ha ocurrido un error",
      error,
    });
  }
};
//get
export const verifyPassword = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await Client.findOne({ where: { id } });
  if (!oldUser) {
    return res.json({ status: "No existe ese usuario" });
  }
  const secret = secretjwt + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email });
  } catch (error) {
    console.log(error);
    res.send("Not verified");
  }
};

//Debería ser put pero es post xD
export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const oldUser = await Client.findOne({ where: { id } });
  if (!oldUser) {
    return res.json({ status: "No existe ese usuario" });
  }
  const secret = secretjwt + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await Client.update(
      { password: encryptedPassword },
      { where: { id: id } }
    ).then(() => {
      console.log("Password update succcesfuly");
    });
    res.redirect("http://127.0.0.1:5173/login");
    //res.render("index", { email: verify.email });
  } catch (error) {
    console.log(error);
    res.json({ status: "Algo salió mal" });
  }
};

export const getClient = async (req, res) => {
  try {
    const client = await Client.findAll({
      attributes: ["id", "fullName", "email", "avatar", "phone", "role"],
      include: [
        {
          model: Aboutme,
          as: "Aboutmes",
          attributes: ["id", "description", "hobbies", "age", "from"],
        },
      ],
    });
    res.json(client);
  } catch (error) {
    console.log(error);
  }
};

export const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    let clientId = await Client.findOne({
      where: { id },
      attributes: ["id", "fullName", "email", "avatar", "phone", "role"],
      include: [
        {
          model: Aboutme,
          as: "Aboutmes",
          attributes: ["id", "description", "hobbies", "age", "from"],
        },
        {
          model: Property,
          attributes: ["title"],
        },
        {
          model: Booking,
          include: [
            {
              model: Client,
              attributes: ["id"],
              include: [
                {
                  model: Comment,
                  attributes: ["id", "comment", "fecha"],
                  include: [
                    {
                      model: Property,
                      attributes: ["id"],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: Comment,
          attributes: ["id", "comment", "fecha"],
          include: [
            {
              model: Property,
              attributes: ["id"],
            },
          ],
        },
      ],
    });

    // const clientSearch = await Payments.findAll({
    //   where: { client_payment: id },
    // });

    if (!clientId) return res.status(400).json({ message: "Client not found" });
    if (clientId) {
      res.json(clientId);
    }
  } catch (err) {
    res.json({
      message: "Something goes wrong",
      data: {},
    });
  }
};

export const updateClient = async (req, res) => {
  //  patch  && avatar upload req.files
  const { id } = req.params;
  let { fullName, phone, description, hobbies, age, from } = req.body;
  try {
    // setear age a number
    if (age) parseInt(age);
    console.log(typeof age);
    // setear hobbie de json a array
    if (hobbies) hobbies = JSON.parse(hobbies);
    console.log(typeof hobbies);

    const client = await Client.findOne({
      where: { id },
    });

    if (!client) return res.status(400).json({ message: "Client not found" });
    const aboutme = await Aboutme.findOne({
      where: { client_about: id },
    });

    if (client) {
      await Client.update(
        {
          fullName,
          phone,
        },
        {
          where: { id },
        }
      );
      if (!aboutme) {
        await Aboutme.create({
          description,
          hobbies,
          age,
          from,
          client_about: id,
        });
      } else {
        await Aboutme.update(
          {
            description,
            hobbies,
            age,
            from,
          },
          {
            where: { client_about: id },
          }
        );
      }
      res.json({
        message: "Client updated successfully",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateAvatar = async (req, res) => {
  const { firebaseUrl } = req.file ? req.file : "";
  const { id } = req.params;

  try {
    const client = await Client.findOne({
      where: { id },
    });

    if (!client) return res.status(400).json({ message: "Client not found" });
    if (client) {
      await Client.update(
        {
          avatar: firebaseUrl,
        },
        {
          where: { id },
        }
      );

      res.json({
        message: "Client updated successfully",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    let client = await Client.findOne({
      where: { id },
    });
    if (!client) return res.status(400).json({ message: "Client not found" });
    if (client) {
      await Client.destroy({
        where: { id },
      });
      res.json({
        message: "Client deleted successfully",
        data: client,
      });
    }
  } catch (err) {
    res.json({
      message: "Something goes wrong",
      data: {},
    });
  }
};
