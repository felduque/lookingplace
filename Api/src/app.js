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
import commentRoutes from "./routes/Comment/comment.routes.js";
import suscribeRoutes from "./routes/Pay/suscribe.routes.js";
import otherRoutes from "./routes/Other/other.routes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from "path";

const app = express();

import cors from "cors";
import { Payments } from "./models/payment.model.js";

// Cors
//app.use(cors({ origin: "*" }));

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
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Relation aboutMe and Client & aboutme and Tenant
Client.hasMany(Aboutme, { foreignKey: "client_about" });
Aboutme.belongsTo(Client, { foreignKey: "client_about" });
Tenant.hasMany(Aboutme, { foreignKey: "tenant_about" });
Aboutme.belongsTo(Tenant, { foreignKey: "tenant_about" });

Tenant.hasMany(Property, { foreignKey: "tenant_property" });
Property.belongsTo(Tenant, { foreignKey: "tenant_property" });

Client.hasMany(Property, { foreignKey: "client_property" });
Property.belongsTo(Client, { foreignKey: "client_property" });

// Relation Comment

Client.hasMany(Comment, { foreignKey: "client_comment" });
Comment.belongsTo(Client, { foreignKey: "client_comment" });

Tenant.hasMany(Comment, { foreignKey: "tenant_comment" });
Comment.belongsTo(Tenant, { foreignKey: "tenant_comment" });

Property.hasMany(Comment, { foreignKey: "property_comment" });
Comment.belongsTo(Property, { foreignKey: "property_comment" });

// Relation Payment

Client.hasMany(Payments, { foreignKey: "client_payment" });
Payments.belongsTo(Client, { foreignKey: "client_payment" });

// Routes
app.use(clientRoutes);
app.use(tenantRoutes);
app.use(propertyRoutes);
app.use(commentRoutes);
app.use(suscribeRoutes);
app.use(otherRoutes);

export default app;
