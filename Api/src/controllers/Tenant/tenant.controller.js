/**
 * TODO: RUTAS A CREAR
 * ! Post: crear tenant => nombre, email, password, verfy, avatar, rol: 1 -> client 2 -> admin
 * ! Post: login => email, password
 * ! Get: userinfo por id => id, nombre, email, avatar
 * ! Post: Registro port gmail
 */

import { Tenant } from "../../models/tenant.model.js";
import { Aboutme } from "../../models/aboutme.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

export const createTenant = async (req, res) => {
  const { firebaseUrl } = req.file ? req.file : "";
  const { fullName, email, password, verify, phone } = req.body;

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
    });
    if (newClient) {
      return res.json({
        message: "Tenant created successfully",
        data: newClient,
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
