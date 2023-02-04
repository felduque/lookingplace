import { Property } from "../../models/property.model.js";
import { Tenant } from "../../models/tenant.model.js";
import { Client } from "../../models/client.model.js";
import { Comment } from "../../models/comment.model.js";

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
    const property = await Property.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "rating",
        "services",
        "checkIn",
        "checkOut",
        "price",
        "smoke",
        "pets",
        "party",
        "rating",
        "capacity",
        "beds",
        "baths",
        "lat",
        "lng",
      ],
      include: [
        {
          model: Comment,
          as: "p_comment",
          attributes: ["id", "comment"],
        },
        {
          model: Client,
          as: "p_client",
          attributes: ["id"],
        },
        {
          model: Tenant,
          as: "p_tenant",
          attributes: ["id"],
        },
      ],
    });
    res.json({
      data: property,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    let propertyId = await Property.findOne({
      where: { id },
      attributes: [
        "id",
        "title",
        "description",
        "image",
        "rating",
        "services",
        "checkIn",
        "checkOut",
        "price",
        "smoke",
        "pets",
        "party",
        "rating",
        "capacity",
        "beds",
        "baths",
        "lat",
        "lng",
      ],
      include: [
        {
          model: Comment,
          as: "p_comment",
          attributes: ["id", "comment"],
        },
        {
          model: Client,
          as: "p_client",
          attributes: ["id"],
        },
        {
          model: Tenant,
          as: "p_tenant",
          attributes: ["id"],
        },
      ],
    });
    res.json({
      data: propertyId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    let property = await Property.findOne({
      where: { id },
    });
    if (!property)
      return res.status(400).json({ message: "Property not found" });
    if (property) {
      await Property.destroy({
        where: { id },
      });
      res.json({
        message: "Property deleted successfully",
        data: Property,
      });
    }
  } catch (err) {
    res.json({
      message: "Something goes wrong",
      data: {},
    });
  }
};

export const updateProperty = async (req, res) => {
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
      res.json({
        message: "Property updated successfully",
        data: property,
      });
    }
  } catch (err) {
    res.json({
      message: "Something goes wrong",
      data: {},
    });
  }
};
