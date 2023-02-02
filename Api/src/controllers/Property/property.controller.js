import { Property } from "../../models/property.model.js";
import { Tenant } from "../../models/tenant.model.js";
import { Client } from "../../models/client.model.js";

export const createProperty = async (req, res) => {
  console.log(req.body);
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

  console.log(req.files);
  const arrayServices = JSON.parse(services);
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
        services: arrayServices,
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
      // console.log(newProperty);
      console.log("created new property");
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
<<<<<<< HEAD
    const property = await Property.findAll({
      attributes: ["id", "title", "description", "capacity", "image", "rating"],
      includes: [
        {
          model: Comment,
          as: "property_comment",
          attributes: ["comment"],
        },
      ],
    });
    console.log("property:", property);
=======
    const property = await Property.findAll();
>>>>>>> 0948fe008e0a3363d6fd98a521712569e3d0fc2c
    res.json(property);
  } catch (error) {
    console.log(error);
  }
};
