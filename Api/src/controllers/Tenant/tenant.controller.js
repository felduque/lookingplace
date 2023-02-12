/**
 * TODO: RUTAS A CREAR
 * ! Post: crear tenant => nombre, email, password, verfy, avatar, rol: 1 -> client 2 -> admin
 * ! Post: login => email, password
 * ! Get: userinfo por id => id, nombre, email, avatar
 * ! Post: Registro port gmail
 */

import express from "express";
import { Tenant } from "../../models/tenant.model.js";
import { Aboutme } from "../../models/aboutme.model.js";
import bcrypt from "bcrypt";
const app = express();
import jwt from "jsonwebtoken";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();
app.set("view engine", "ejs");
var nodemailer = require("nodemailer");

const secretjwt =
  "5e6fa1b1bfd5a93c5e7ae001e4c96794c0e8f004095074b42608dc3a0acb67574e2821518d6638eef13c9f882408c861f9cc09e603439e9a93aae6a2b9146e44";

export const createTenant = async (req, res) => {
  const { firebaseUrl } = req.file ? req.file : "";
  const { fullName, email, password, verify, phone, role } = req.body;

  // ! Encrypt password
  const salt = await bcrypt.genSalt(10);
  const passwordCrypt = await bcrypt.hash(password, salt);
  try {
    const searchPhone = await Tenant.findOne({ where: { phone } });
    const searchEmail = await Tenant.findOne({ where: { email } });
    if (searchEmail) return res.status(400).json({ message: "Email exists" });
    if (searchPhone) return res.status(400).json({ message: "Phone exists" });

    let newClient = await Tenant.create({
      fullName,
      email,
      password: passwordCrypt,
      verify,
      avatar: firebaseUrl,
      phone,
      role,
    });
    if (newClient) {
      return res.json({
        message: "Tenant created successfully",
        data: newClient,
        token: secretjwt,
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

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "emailname and password are required." });

  const foundUser = await Tenant.findOne({ where: { email } });
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  //evaluate password
  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    return res.status(400).json({ message: "Password incorrecta" });
  }

  if (match) {
    //create JWTS
    const accessToken = jwt.sign(
      {
        userInfo: {
          email: foundUser.email,
        },
      },
      secretjwt,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      "b0b53d04c7f3a2631116667f0786b94a0fea2b668fac2ad776442e786ba1a6cbf92a6f65034bbff1dfb9168567d31a780058856aef566993a894937d44303ec2",
      {
        expiresIn: "1d",
      }
    );

    //Saving refreshToken with current email
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    //Creaamos cookie segura con refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    //Enviamos accessToken
    console.log(foundUser.id);
    let userId = foundUser.id;
    let role = foundUser.role;

    //require("crypto").randomBytes(64).toString("hex");
    res.status(200).json({ accessToken, userId, role });
  }
};

export const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //no content
  const refreshToken = cookies.jwt;

  //Está refreshtoken en la db?
  const foundUser = await Tenant.findOne({ where: { refreshToken } });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  //Delete refresh token en db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  //console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

export const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await Tenant.findOne({ where: { refreshToken } });
  if (!foundUser) return res.sendStatus(403);

  //evualar jwt
  jwt.verify(
    refreshToken,
    "b0b53d04c7f3a2631116667f0786b94a0fea2b668fac2ad776442e786ba1a6cbf92a6f65034bbff1dfb9168567d31a780058856aef566993a894937d44303ec2",
    (err, decoded) => {
      if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: decoded.email,
          },
        },
        secretjwt,
        { expiresIn: "15h" }
      );
      res.json({ accessToken });
    }
  );
};

export const forgot = async (req, res) => {
  const { email } = req.body;

  try {
    const oldUser = await Tenant.findOne({ where: { email } });
    if (!oldUser) {
      return res.json({ status: "No existe ese usuario" });
    }
    const secret = secretjwt + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
      expiresIn: "10m",
    });
    const link = `http://127.0.0.1:3000/reset/${oldUser.id}/${token}`;

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
      text: link,
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

export const verifyPassword = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await Tenant.findOne({ where: { id } });
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

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const oldUser = await Tenant.findOne({ where: { id } });
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

export const getTenant = async (req, res) => {
  try {
    const client = await Tenant.findAll({
      attributes: ["id", "fullName", "email", "avatar"],
      include: [
        {
          model: Aboutme,
          as: "Aboutmes",
          attributes: ["id", "description", "hobbies", "age", "from"],
        },
      ],
    });
    res.json({
      data: client,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTenantById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Tenant.findOne({
      where: { id },
      attributes: ["id", "fullName", "email", "avatar"],
      include: [
        {
          model: Aboutme,
          as: "Aboutmes",
          attributes: ["id", "description", "hobbies", "age", "from"],
        },
      ],
    });
    res.json({
      data: client,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTenant = async (req, res) => {
  const { firebaseUrl } = req.file ? req.file : "";
  const { id } = req.params;
  const { fullName, email, password, verify, avatar, phone } = req.body;
  try {
    const client = await Tenant.findAll({
      attributes: ["id", "fullName", "email", "avatar"],
      where: { id },
    });
    if (client.length > 0) {
      client.forEach(async (client) => {
        await client.update({
          fullName,
          email,
          password,
          verify,
          avatar: firebaseUrl,
          phone,
        });
      });
    }
    return res.json({
      message: "Tenant updated successfully",
      data: client,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something goes wrong",
      data: {},
    });
  }
};

export const deleteTenant = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteRowCount = await Tenant.destroy({
      where: { id },
    });
    res.json({
      message: "Tenant deleted successfully",
      count: deleteRowCount,
    });
  } catch (error) {
    console.log(error);
  }
};

export const validateTenant = async (req, res) => {
  const { email, password } = req.body;
  try {
    const client = await Tenant.findOne({
      where: { email, password },
    });

    if (client) {
      return res.json({
        message: "Tenant found successfully",
        data: client,
        token: jsonw,
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
