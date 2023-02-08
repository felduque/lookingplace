import { Property } from "../../models/property.model.js";
import { Tenant } from "../../models/tenant.model.js";
import { Client } from "../../models/client.model.js";
import { Comment } from "../../models/comment.model.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createProperty = async (req, res) => {
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
    country,
    state,
    region,
    city,
    tenant_property,
    client_property,
  } = req.body;

  // ! Upload Image
  const img = req.files?.image;
  console.log(req.files);
  console.log(img);
  // let pathImage = __dirname + "/../../public/client/" + img?.name;
  // img?.mv(pathImage);
  // let url = (pathImage = "http://localhost:3000/client/" + img?.name);
  let url = ["image"];

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
        image: url,
        party,
        pets,
        price,
        rating,
        lat,
        lng,
        country,
        state,
        region,
        city,
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
      return res.json(newProperty);
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
  const { country, state, order, rating, price, capacity } = req.query;
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
        "country",
        "state",
        "region",
        "city",
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
    let result = property;
    let filteres = "";
    if (country) {
      result = result.filter((property) => property.country == country);
      filteres += " country=" + country;
    }
    if (state) {
      let stateFilter = result.filter((property) => property.state == state);
      if (stateFilter.length > 0) {
        result = [...stateFilter];
      }
      filteres += " state=" + state;
    }
    if (order === "asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
      filteres += " order=asc";
    }
    if (order === "desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
      filteres += " order=desc";
    }
    if (rating === "min") {
      result.sort((a, b) => a.rating - b.rating);
      filteres += " rating=min";
    }
    if (rating === "max") {
      result.sort((a, b) => b.rating - a.rating);
      filteres += " rating=max";
    }
    if (price === "low") {
      result.sort((a, b) => a.price - b.price);
      filteres += " price=low";
    }
    if (price === "high") {
      result.sort((a, b) => b.price - a.price);
      filteres += " price=high";
    }
    if (capacity === "lowest") {
      result.sort((a, b) => a.capacity - b.capacity);
      filteres += " capacity=lowest";
    }
    if (capacity === "highest") {
      result.sort((a, b) => b.capacity - a.capacity);
      filteres += " capacity=highest";
    }
    return res.status(200).json({
      msg: `Sucessfully filtered ${filteres}`,
      result,
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
        "country",
        "state",
        "region",
        "city",
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
    res.json(propertyId);
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
      res.json(property);
    }
  } catch (err) {
    res.json({
      message: "Something goes wrong",
      data: {},
    });
  }
};
