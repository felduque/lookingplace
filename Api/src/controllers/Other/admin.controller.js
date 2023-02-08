/**
 * TODO: RUTAS ADMINISTRATIVAS
 * ! GET: get all users => id, nombre, email, avatar, rol
 * ! GET: get user by id => id, nombre, email, avatar, rol
 * ! delete user by id
 * ! PATCH   user by id => nombre, email, avatar, rol
 * ! PATCH PARA CAMBIAR BY CHECK IN CHECK OUT
 */

import { Client } from "../../models/client.model.js";
import { Property } from "../../models/property.model.js";
import { Tenant } from "../../models/tenant.model.js";
import { Aboutme } from "../../models/aboutme.model.js";
import { ClientRecord } from "../../models/clientRecord.model.js";

export const getAllTenants = async (req, res) => {
  try {
    const tenant = await Tenant.findAll({
      attributes: ["id", "fullName", "email", "avatar"],
      include: [
        {
          model: Aboutme,
          as: "Aboutmes",
          attributes: ["id", "description", "hobbies", "age", "from"],
        },
        {
          model: Property,
          as: "",
        },
      ],
    });
    res.json({
      tenant,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createClientRecord = async (req, res) => {
  const { client_record } = req.body;
  try {
    const newClientRecord = await ClientRecord.create({
      client_record,
    });
    if (newClientRecord) {
      // console.log(newProperty);
      console.log("Created new client record");
      return res.json(newClientRecord);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      data: {},
    });
  }
};

export const clientRecordsGet = async (req, res) => {
  try {
    const records = await Client.findAll({
      id,
    });
    if (records) {
      return res.json(records);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      data: {},
    });
  }
};

export const getAllClientsRecords = async (req, res) => {
  try {
    const clients = await ClientRecord.findAll({
      attributes: ["id"],
      include: [
        {
          model: Client,
          as: "record_client",
          attributes: ["id", "fullName", "email", "avatar", "phone", "admin"],
          include: [
            {
              model: Property,
              as: "rented_property",
              attributes: ["id", "title", "checkIn", "checkOut", "updatedAt"],
            },
            {
              model: Aboutme,
              as: "Aboutmes",
              attributes: ["id", "description", "hobbies", "age", "from"],
            },
          ],
        },
      ],
    });
    if (clients) {
      return res.status(200).json(clients);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      data: {},
    });
  }
};

export const getClientsById = async (req, res) => {
  const { id } = req.params;
  try {
    const clientId = await Client.findByPk({
      where: { id },
      attributes: ["id", "fullName", "email", "avatar", "phone", "admin"],
      include: [
        {
          model: Aboutme,
          as: "Aboutmes",
          attributes: ["id", "description", "hobbies", "age", "from"],
        },
        {
          model: ClientRecord,
          as: "client_record_id",
          attributes: ["id"],
        },
        {
          model: Property,
          as: "rented_property",
          attributes: ["id", "title", "checkIn", "checkOut", "updatedAt"],
        },
      ],
    });
    res.json(clientId);
  } catch (error) {
    console.log(error);
  }
};

export const getPropertiesById = async (req, res) => {
  const { id } = req.params;
  try {
    const propertyId = await Property.findOne({
      where: { id },
      attributes: [
        "id",
        "title",
        "description",
        "checkIn",
        "checkOut",
        "price",
      ],
      include: [
        {
          model: Client,
          as: "rented_by",
          attributes: ["id", "fullName", "email", "phone"],
          include: [
            {
              model: ClientRecord,
              as: "client_record_id",
              attributes: ["id"],
            },
          ],
        },
        {
          model: Tenant,
          as: "p_tenant",
          attributes: ["id"],
        },
      ],
    });
    res.json(propertyId);
  } catch (error) {
    console.log(error);
  }
};

export const updatePropertyById = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    checkIn,
    checkOut,
    capacity,
    beds,
    baths,
    services,
    smoke,
    party,
    pets,
    price,
    rating,
    lat,
    lng,
    tenant_property,
    client_property,
  } = req.body;
  try {
    let property = await Property.findOne({
      where: { id },
    });
    if (!property)
      return res.status(400).json({ message: "Property not found" });
    if (property) {
      await Property.update(
        {
          title,
          description,
          checkIn,
          checkOut,
          capacity,
          beds,
          baths,
          services,
          smoke,
          party,
          pets,
          price,
          rating,
          lat,
          lng,
          tenant_property,
          client_property,
        },
        {
          where: { id },
        }
      );
    }
  } catch (err) {
    res.json({
      message: "Something goes wrong",
      data: {},
    });
  }
};

// export const getAllClients = async (req, res) => {
//   try {
//     const client = await Client.findAll({
//       attributes: ["id", "fullName", "email", "avatar", "phone", "admin"],
//       include: [
//         {
//           model: Aboutme,
//           as: "Aboutmes",
//           attributes: ["id", "description", "hobbies", "age", "from"],
//         },
//         {
//           model: ClientRecord,
//           as: "client_record_id",
//           attributes: ["id"],
//         },
//         {
//           model: Property,
//           as: "rented_property",
//           attributes: ["id", "title", "checkIn", "checkOut", "updatedAt"],
//         },
//       ],
//     });
//     res.json(client);
//   } catch (error) {
//     console.log(error);
//   }
// };
