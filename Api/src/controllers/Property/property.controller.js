import { Property } from "../../models/property.model.js";
import { Tenant } from "../../models/tenant.model.js";
import { Client } from "../../models/client.model.js";
import { Comment } from "../../models/comment.model.js";

export const createProperty = async (req, res) => {
  // si files es un array lo iteramos y agregamos a nuestro array cada uno a nuestro array que usaremos en la propiedad
  const { files } = req; // extraemos files de la solicitud req, esto nos permite acceder a cualquier propiedad req.files en el resto del codigo en este caso en firebase.js
  const firebaseUrls = [];
  if (files && Array.isArray(files)) {
    files.forEach((file) => {
      firebaseUrls.push(file.firebaseUrl);
    });
  }

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
    country,
    state,
    city,
    region,
  } = req.body;

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
        image: firebaseUrls,
        party,
        pets,
        price,
        rating,
        lat,
        lng,
        tenant_property,
        country,
        state,
        city,
        region,
      },
      {
        includes: [
          {
            model: Tenant,
            as: "tenant_property",
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
  const { country, state, order, rating, price, capacity, title } = req.query;
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
          as: "Comments",
          attributes: ["id", "comment"],
        },
        {
          model: Client,
          as: "Client",
          attributes: ["id"],
        },
        {
          model: Tenant,
          as: "Tenant",
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
    if (title) {
      result = result.filter((property) => {
        let propertyLower = property.title.toLowerCase();
        return propertyLower.includes(title.toLowerCase());
      });
      filteres += " title=" + title;
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
        "bookings",
      ],
      include: [
        {
          model: Comment,
          as: "Comments",
          attributes: ["id", "comment"],
        },
        {
          model: Client,
          as: "Client",
          attributes: ["id"],
        },
        {
          model: Tenant,
          as: "Tenant",
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
    country,
    state,
    city,
    region,
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
          country,
          state,
          city,
          region,
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

export const patchBookingsProperty = async (req, res) => {
  const { id, bookings } = req.body;
  console.log(id, bookings);
  try {
    let searchProperty = await Property.findOne({
      where: { id },
    });
    if (searchProperty.bookings === null) {
      await searchProperty.update({ bookings: bookings });
      res.json("funciono");
    } else {
      let arrayBookings = [...searchProperty.bookings, ...bookings];
      await searchProperty.update({ bookings: arrayBookings });
      res.json(arrayBookings);
    }
  } catch (e) {
    return res.status(404).json({
      message: "Something goes wrong",
      error: e,
    });
  }
};

export const createBulkProperty = async (req, res) => {
  await Property.bulkCreate(req.body)
  res.status(200).send("bulk creado");
}

// export const patchBookingsProperty = async (req, res) => {
//   const { id, bookings } = req.body;
//   console.log(id, bookings);
//   try {
//     let propertyFind = await Property.findByPk(id);
//     console.log(propertyFind.bookings);
//     if (propertyFind.bookings === null) {
//       console.log("entre al null");
//       await propertyFind.update({ bookings: bookings });
//     } else {
//       let arrayBookings = [...propertyFind.bookings, ...bookings];
//       await propertyFind.update({ bookings: arrayBookings });
//     }
//     console.log(arrayBookings);

//     return res.status(200).json(propertyFind);
//   } catch (e) {
//     return res.status(404).json({
//       message: "Something goes wrong",
//       error: e,
//     });
//   }
// };

// export const patchBookingsProperty = async (req, res) => {
//   const { id, bookings } = req.body;
//   console.log(id, bookings);
//   try {
//     let propertyFind = await Property.findByPk(id);
//     console.log("Property  : ", propertyFind.bookings);

//     let arrayBookings = [...propertyFind.bookings, ...bookings];
//     console.log(arrayBookings);

//     await propertyFind.update({ bookings: arrayBookings });
//     await propertyFind.save();
//     return res.status(200).json(propertyFind);
//   } catch (e) {
//     return res.status(404).json({
//       message: "Something goes wrong",
//       error: e,
//     });
//   }
// };
