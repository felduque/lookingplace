import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { Aboutme } from "./models/aboutme.model.js";
import { Character } from "./models/characteristics.model.js";
import { Client } from "./models/client.model.js";
import { Comment } from "./models/comment.model.js";
import { Property } from "./models/property.model.js";
import { Tenant } from "./models/tenant.model.js";
import clientRoutes from "./routes/Client/client.routes.js";
import tenantRoutes from "./routes/Tenant/tenant.routes.js";
import propertyRoutes from "./routes/Property/property.routes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from "path";
// import cors from "cors";

const app = express();

// Midelewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

// Relation aboutMe and Client & aboutme and Tenant
Client.hasMany(Aboutme, { foreignKey: "client_about" });
Aboutme.belongsTo(Client, { foreignKey: "client_about" });
Tenant.hasMany(Aboutme, { foreignKey: "tenant_about" });
Aboutme.belongsTo(Tenant, { foreignKey: "tenant_about" });

Tenant.hasMany(Property, { foreignKey: "tenant_property" });
Property.belongsTo(Tenant, { foreignKey: "tenant_property" });

Client.hasMany(Property, { foreignKey: "client_property" });
Property.belongsTo(Client, { foreignKey: "client_property" });

// Routes
app.use(clientRoutes);
app.use(tenantRoutes);
app.use(propertyRoutes);

export default app;
