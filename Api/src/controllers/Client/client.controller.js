/**
 * TODO: RUTAS A CREAR
 * ! Post: crear client => nombre, email, password, verfy, avatar, rol: 1 -> client 2 -> admin
 * ! Post: login => email, password
 * ! Post: Registro port gmail
 * ! get: userinfo por id => id, nombre, email, avatar
 *
 */
import { Aboutme } from "../../models/aboutme.model.js";
import { Client } from "../../models/client.model.js";
import { Tenant } from "../../models/tenant.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { dirname } from "path";
import jwt from "jsonwebtoken";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { token } = require("./../../../package.json");

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
  const { fullName, email, password, verify, phone } = req.body;
  // ! Upload Image
  const img = req.files?.img;
  let pathImage = __dirname + "/../../public/client/" + img?.name;
  img?.mv(pathImage);
  let url = (pathImage = "http://localhost:3000/client/" + img?.name);
  if (!img) url = "google.com";
  // ! json web token
  const jsonw = jwt.sign({ id: email }, token, {
    expiresIn: 60 * 60 * 24,
  });

  // ! Encrypt password
  const salt = await bcrypt.genSalt(10);
  const passwordCrypt = await bcrypt.hash(password, salt);
  try {
    const searchPhone = await Client.findOne({ where: { phone } });
    const searchEmail = await Client.findOne({ where: { email } });
    if (searchEmail) return res.status(400).json({ message: "Email exists" });
    if (searchPhone) return res.status(400).json({ message: "Phone exists" });

    let newClient = await Client.create(
      {
        fullName,
        email,
        password: passwordCrypt,
        verify,
        avatar: url,
        phone,
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
      return res.json({
        message: "Client created successfully",
        data: newClient,
        token: jsonw,
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
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "emailname and password are required." });

  const foundUser = await Client.findOne({ where: { email } });
  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    try {
      const token = jwt.sign(
        { email: email, password: password },
        "24bfa9d95a7799b7cec3ef56ad0a7c1e49d91c879967eb64e18b1732ffec9a45ad2743648d802ffdd7297793edf64b58c3bf6b080d0280ca469c98854d01ad50",
        { expiresIn: "3m" }
      );
      require("crypto").randomBytes(64).toString("hex");
      res.status(200).json(token);
    } catch (err) {
      console.log(err);
    }
  }
};

export const getClient = async (req, res) => {
  try {
    const client = await Client.findAll({
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

export const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    let clientId = await Client.findOne({
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
    if (!clientId) return res.status(400).json({ message: "Client not found" });
    if (clientId) {
      res.json({
        data: clientId,
      });
    }
  } catch (err) {
    res.json({
      message: "Something goes wrong",
      data: {},
    });
  }
};

export const updateClient = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, password, verify, avatar } = req.body;
  try {
    let client = await Client.findOne({
      where: { id },
    });
    if (!client) return res.status(400).json({ message: "Client not found" });
    if (client) {
      await Client.update(
        {
          fullName,
          email,
          password,
          verify,
          avatar,
        },
        {
          where: { id },
        }
      );
      res.json({
        message: "Client updated successfully",
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

export const validateClient = async (req, res) => {
  const { email, password } = req.body;
  try {
    let client = await Client.findOne({ where: { email } });
    if (!client) return res.status(400).json({ message: "Client not found" });
    if (client) {
      const validPassword = await bcrypt.compare(password, client.password);
      if (!validPassword)
        return res.status(400).json({ message: "Invalid password" });
      // ! json web token
      const jsonw = jwt.sign({ id: email }, token, {
        expiresIn: 60 * 60 * 24,
      });

      if (validPassword === true) {
        res.json({
          message: validPassword,
          data: client,
          token: jsonw,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something goes wrong",
      data: {},
    });
  }
};

export const googleMapCoord = async (req, res) => {
  const { lat, lng } = req.body;
  try {
    let client = await Client.findOne({ where: { lat, lng } });
    if (!client) return res.status(400).json({ message: "Client not found" });
    if (client) {
      res.json({
        message: "Client found",
        data: client,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something goes wrong",
      data: {},
    });
  }
};
