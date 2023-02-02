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
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
      if (validPassword === true) {
        res.json({
          message: validPassword,
          data: client,
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
