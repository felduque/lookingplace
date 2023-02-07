/**
 * TODO: RUTAS ADMINISTRATIVAS
 * ! GET: get all users => id, nombre, email, avatar, rol
 * ! GET: get user by id => id, nombre, email, avatar, rol
 * ! delete user by id
 * ! PATCH   user by id => nombre, email, avatar, rol
 */

import { Client } from "../../models/client.model.js";
import { Property } from "../../models/property.model.js";
import { Tenant } from "../../models/tenant.model.js";
import { Aboutme } from "../../models/aboutme.model.js";

export const getAllClients = async(req, res) => {
    try {
        const client = await Client.findAll({
            attributes: ["id", "fullName", "email", "avatar", "phone"],
            include: [{
                    model: Aboutme,
                    as: "Aboutmes",
                    attributes: ["id", "description", "hobbies", "age", "from"],
                },
                {
                    model: Property,
                    as: "client_p",
                    attributes: ["id", "title"],
                },
            ],
        });
        res.json(client);
    } catch (error) {
        console.log(error);
    }
};

export const getAllTenants = async(req, res) => {
    try {
        const client = await Tenant.findAll({
            attributes: ["id", "fullName", "email", "avatar"],
            include: [{
                model: Aboutme,
                as: "Aboutmes",
                attributes: ["id", "description", "hobbies", "age", "from"],
            }, ],
        });
        res.json({
            data: client,
        });
    } catch (error) {
        console.log(error);
    }
};