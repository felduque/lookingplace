import { Property } from "../../models/property.model.js";
import { Tenant } from "../../models/tenant.model.js";
import { Client } from "../../models/client.model.js";

export const createProperty = async (req, res) => {
  const {
    title,
    description,
    capacity,
    beds,
    baths,
    pets,
    smoke,
    party,
    price,
    image,
    rating,
    tenant_property,
    client_property,
    checkIn,
    checkOut,
  } = req.body;
  try {
    let newProperty = await Property.create(
      {
        title,
        description,
        capacity,
        beds,
        baths,
        pets,
        smoke,
        party,
        price,
        image,
        rating,
        tenant_property,
        client_property,
        checkIn,
        checkOut,
      },
      {
        includes: [
          {
            model: Tenant,
            as: "tenant_property",
            attributes: ["id"],
          },
          {
            model: Client,
            as: "client_property",
            attributes: ["id"],
          },
        ],
      }
    );
    if (newProperty) {
      return res.json({
        message: "Property created successfully",
        data: newProperty,
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
