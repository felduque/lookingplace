import { Property } from "../../models/property.model.js";
import { Tenant } from "../../models/tenant.model.js";
import { Client } from "../../models/client.model.js";
import { Comment } from "../../models/comment.model.js";

//numero de camas, numero de baños, servicios (wifi, cocina, lavadora, plancha, zona de trabajo, checking checkout)

export const createProperty = async (req, res) => {
  const {
    title,
    description,
    checkIn,
    checkOut,
    capacity,
    beds,
    baths,
    // services,
    smoke,
    party,
    pets,
    price,
    rating,
    tenant_property,
    client_property,
  } = req.body;
    const image = req.files;
  try {
    let newProperty = await Property.create(
      {
        title,
        description,
        checkIn,
        checkOut,
        capacity,
        beds,
        baths,
        // services: arrayServices,
        smoke,
        party,
        pets,
        price,
        rating,
        tenant_property,
        client_property,
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

export const getProperty = async (req, res) => {
  try {
    const property = await Property.findAll({
      attributes: ["id", "title", "description", "capacity", "image", "rating"],
      includes: [
        {
          model: Comment,
          as: "property_comment",
          attributes: ["id", "comments"],
        },
      ],
    });
    res.json({ property });
  } catch (error) {
    console.log(error);
  }
};
