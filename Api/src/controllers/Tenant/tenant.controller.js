/**
 * TODO: RUTAS A CREAR
 * ! Post: crear tenant => nombre, email, password, verfy, avatar, rol: 1 -> client 2 -> admin
 * ! Post: login => email, password
 * ! Get: userinfo por id => id, nombre, email, avatar
 * ! Post: Registro port gmail
 */

import { Tenant } from "../../models/tenant.model.js";
import { Aboutme } from "../../models/aboutme.model.js";

export const createTenant = async (req, res) => {
  const { fullName, email, password, verify, avatar, phone } = req.body;
  try {
    let newClient = await Tenant.create({
      fullName,
      email,
      password,
      verify,
      avatar,
      phone,
    });
    if (newClient) {
      return res.json({
        message: "Client created successfully",
        data: newClient,
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
          avatar,
          phone,
        });
      });
    }
    return res.json({
      message: "Client updated successfully",
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
      message: "Client deleted successfully",
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
        message: "Client found successfully",
        data: client,
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
