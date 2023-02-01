import { Property } from "../../models/property.model.js";
import { Tenant } from "../../models/tenant.model.js";
import { Client } from "../../models/client.model.js";


//numero de camas, numero de baños, servicios (wifi, cocina, lavadora, plancha, zona de trabajo, checking checkout)

export const createProperty = async (req, res) => {
    const { title, description, capacity, image, rating, tenant_property, client_property } =
      req.body;
    try {
      let newProperty = await Property.create(
        {
          title,
          description,
          capacity,
          image,
          rating,
          tenant_property,
					client_property
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
      });
      res.json({
        data: property,
      });
    } catch (error) {
      console.log(error);
    }
  };