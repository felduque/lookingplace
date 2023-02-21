import { Property } from "../../models/property.model.js";
import { Tenant } from "../../models/tenant.model.js";
import { Client } from "../../models/client.model.js";
import { Comment } from "../../models/comment.model.js";
import { Booking } from "../../models/booking.model.js";
import { sendEmailProperty } from "../Nodemailer/nodemailer.controller.js";

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
    id_tenant,
  } = req.body;

  console.log(id_tenant);

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

    // console.log(newProperty);
    // console.log(newProperty.id);

    let tenantSearch = await Tenant.findOne({
      where: {
        id: id_tenant,
      },
    });

    await tenantSearch.addProperty(newProperty.id);

    if (newProperty) {
      // console.log(newProperty);
      sendEmailProperty(
        newProperty,
        tenantSearch.dataValues.fullName,
        tenantSearch.dataValues.email
      );
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
  const {
    country,
    state,
    order,
    rating,
    capacity,
    title,
    beds,
    priceMin,
    priceMax,
    baths,
    smoking,
    pets,
    party,
    services,
  } = req.query;
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
          attributes: ["id", "comment", "fecha"],
        },
        {
          model: Client,
          as: "Client",
          attributes: ["id", "fullName", "avatar", "email"],
        },
        {
          model: Tenant,
          as: "Tenant",
          attributes: ["id", "fullName", "avatar", "email"],
        },
      ],
    });
    let result = property;
    let filters = "";
    if (country) {
      result = result.filter((property) => property.country == country);
      filters += " country=" + country;
    }
    if (state) {
      let stateFilter = result.filter((property) => property.state == state);
      if (stateFilter.length > 0) {
        result = [...stateFilter];
      }
      filters += " state=" + state;
    }
    if (title) {
      result = result.filter((property) => {
        let propertyLower = property.title.toLowerCase();
        return propertyLower.includes(title.toLowerCase());
      });
      filters += " title=" + title;
    }
    if (order === "asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
      filters += " order=asc";
    }
    if (order === "desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
      filters += " order=desc";
    }
    if (rating === "lowest") {
      result.sort((a, b) => a.rating - b.rating);
      filters += " rating=lowest";
    }
    if (rating === "highest") {
      result.sort((a, b) => b.rating - a.rating);
      filters += " rating=highest";
    }
    if (parseFloat(rating)) {
      result = result.filter(
        (property) => Math.abs(property.rating - parseFloat(rating)) < 0.1
      );
      filters += ` rating=${rating}`;
    }
    if (capacity) {
      const capacityValue = parseInt(capacity);
      result = result.filter((property) => property.capacity === capacityValue);
      // result.sort((a, b) => b.capacity - a.capacity);
      filters += ` capacity=${capacityValue}`;
    }
    if (beds) {
      const bedsValue = parseInt(beds);
      result = result.filter((property) => property.beds === bedsValue);
      // result.sort((a, b) => b.beds - a.beds);
      filters += ` beds=${bedsValue}`;
    }
    if (baths) {
      const bathsValue = parseInt(baths);
      result = result.filter((property) => property.baths === bathsValue);
      // result.sort((a, b) => b.baths - a.baths);
      filters += ` baths=${bathsValue}`;
    }
    if (priceMin) {
      result = result.filter((property) => property.price >= priceMin);
      filters += ` priceMin=${priceMin}`;
    }
    if (priceMax) {
      result = result.filter((property) => property.price <= priceMax);
      filters += ` priceMax=${priceMax}`;
    }
    if (smoking) {
      const smokingAllowed = smoking === "true";
      result = result.filter((property) => property.smoke === smokingAllowed);
      filters += ` smoking=${smokingAllowed}`;
    }
    if (pets) {
      const petsAllowed = pets === "true";
      result = result.filter((property) => property.pets === petsAllowed);
      filters += ` pets=${petsAllowed}`;
    }
    if (party) {
      const partyAllowed = party === "true";
      result = result.filter((property) => property.party === partyAllowed);
      filters += ` party=${partyAllowed}`;
    }
    if (services) {
      const selectedServices = services.split(",").map((s) => s.toUpperCase());
      result = result.filter((property) => {
        const propertyServices = property.services.map((s) => s.toUpperCase());
        for (let i = 0; i < selectedServices.length; i++) {
          if (propertyServices.includes(selectedServices[i])) {
            return true;
          }
        }
        return false;
      });
      filters += ` services=${services}`;
    }
    return res.status(200).json({
      msg: `Sucessfully filtered ${filters}`,
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
          attributes: [
            "id",
            "comment",
            "fecha",
            "author",
            "avatar",
            "calificacion",
          ],
        },
        {
          model: Client,
          as: "Client",
          attributes: ["id", "fullName", "avatar", "email"],
        },
        {
          model: Tenant,
          as: "Tenant",
          attributes: ["id", "fullName", "avatar", "email"],
        },
        {
          model: Booking,
          attributes: ["id", "bookingsPropCli"],
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
  console.log(req.body);
  const { id, bookings, idClient } = req.body;
  console.log("Soy Id", id, bookings, "Soy IdCliente", idClient);
  try {
    let searchProperty = await Property.findOne({
      where: { id },
    });
    let clientSearch = await Client.findOne({
      where: {
        id: idClient,
      },
    });
    if (searchProperty.bookings === null) {
      await searchProperty.update({ bookings: bookings });
      await clientSearch.addProperty(id);
      res.json("funciono");
    } else {
      let arrayBookings = [...searchProperty.bookings, ...bookings];
      await searchProperty.update({ bookings: arrayBookings });
      await clientSearch.addProperty(id);
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
  await Property.bulkCreate(req.body);
  res.status(200).send("bulk creado");
};

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
