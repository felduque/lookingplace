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
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { createRequire } from "module";
// import { Payments } from "../../models/payment.model.js";
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
  const { fullName, email, password, verify, phone, admin } = req.body;
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
        admin,
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
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  //evaluate password
  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    //create JWTS
    const accessToken = jwt.sign(
      {
        userInfo: {
          email: foundUser.email,
        },
      },
      "5e6fa1b1bfd5a93c5e7ae001e4c96794c0e8f004095074b42608dc3a0acb67574e2821518d6638eef13c9f882408c861f9cc09e603439e9a93aae6a2b9146e44",
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
    console.log(result);

    //Creaamos cookie segura con refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    //Enviamos accessToken

    //require("crypto").randomBytes(64).toString("hex");
    res.status(200).json({ accessToken });
  }
};

export const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //no content
  const refreshToken = cookies.jwt;

  //Está refreshtoken en la db?
  const foundUser = await Client.findOne({ where: { refreshToken } });
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

  const foundUser = await Client.findOne({ where: { refreshToken } });
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
        "5e6fa1b1bfd5a93c5e7ae001e4c96794c0e8f004095074b42608dc3a0acb67574e2821518d6638eef13c9f882408c861f9cc09e603439e9a93aae6a2b9146e44",
        { expiresIn: "15h" }
      );
      res.json({ accessToken });
    }
  );
};

export const getClient = async (req, res) => {
  try {
    const client = await Client.findAll({
      attributes: ["id", "fullName", "email", "avatar", "phone"],
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
      attributes: ["id", "fullName", "email", "avatar", "phone"],
      include: [
        {
          model: Aboutme,
          as: "Aboutmes",
          attributes: ["id", "description", "hobbies", "age", "from"],
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
  let { fullName, email, phone, description, hobbies, age, from } = req.body;
  const img = req.files?.avatar;
  const imgName = img?.name;
  console.log(req.files);
  console.log(id);
  console.log(fullName, email, phone, description, hobbies, age, from);
  try {
    let pathImage = __dirname + "/../../public/client/" + imgName;
    img?.mv(pathImage);
    let url = (pathImage = "http://localhost:3000/client/" + imgName);
    // setear age a number
    const ageNumber = parseInt(age);

    // setear hobbie de json a array
    if (hobbies) hobbies = JSON.parse(hobbies);
    console.log(typeof hobbies);

    const client = await Client.findOne({
      where: { id },
    });
    if (!img) url = client.avatar;
    if (!client) return res.status(400).json({ message: "Client not found" });
    if (client) {
      await Client.update(
        {
          fullName,
          email,
          phone,
          avatar: url,
        },
        {
          where: { id },
        }
      );
      await Aboutme.update(
        {
          description,
          hobbies,
          age: ageNumber,
          from,
        },
        {
          where: { client_about: id },
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
