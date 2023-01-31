import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { Aboutme } from "./models/aboutme.model.js";
import { Character } from "./models/characteristics.model.js";
import { Client } from "./models/client.model.js";
import { Comment } from "./models/comment.model.js";
import { Propierty } from "./models/propierty.model.js";
import { Tenant } from "./models/tenant.model.js";
import clientRoutes from "./routes/Client/client.routes.js";
import tenantRoutes from "./routes/Tenant/tenant.routes.js";
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
app.use(morgan("dev"));

// Relation aboutMe and Client & aboutme and Tenant
// Client.hasMany(Aboutme, { foreignKey: "client_about" });
// Aboutme.belongsTo(Client, { foreignKey: "client_about" });
// Tenant.hasMany(Aboutme, { foreignKey: "tenant_about" });
// Aboutme.belongsTo(Tenant, { foreignKey: "tenant_about" });

Client.hasOne(Aboutme, { foreignKey: "client_about" });
Aboutme.belongsTo(Client, { foreignKey: "client_about" });

Tenant.hasOne(Aboutme, { foreignKey: "tenant_about" });
Aboutme.belongsTo(Tenant, { foreignKey: "tenant_about" });


// Routes
app.use(clientRoutes);
app.use(tenantRoutes);

export default app;
