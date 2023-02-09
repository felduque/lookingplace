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
import { ClientRecord } from "./models/clientRecord.model.js";
import clientRoutes from "./routes/Client/client.routes.js";
import tenantRoutes from "./routes/Tenant/tenant.routes.js";
import propertyRoutes from "./routes/Property/property.routes.js";
import commentRoutes from "./routes/Comment/comment.routes.js";
import payRoutes from "./routes/Pay/pay.routes.js";
import otherRoutes from "./routes/Other/other.routes.js";
import adminRoutes from "./routes/Admin/admin.routes.js";

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
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

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
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  next();
});

// Relation aboutMe and Client & aboutme and Tenant
Client.hasMany(Aboutme, { foreignKey: "client_about" });
Aboutme.belongsTo(Client, { foreignKey: "client_about" });

Tenant.hasMany(Aboutme, { foreignKey: "tenant_about" });
Aboutme.belongsTo(Tenant, { foreignKey: "tenant_about" });

Tenant.hasMany(Property, { foreignKey: "tenant_property" });
Property.belongsTo(Tenant, { as: "p_tenant", foreignKey: "tenant_property" });

Client.hasMany(Property, {
  as: "rented_property",
  foreignKey: "client_property",
});
Property.belongsTo(Client, { as: "rented_by", foreignKey: "client_property" });

// Relation Comment

Client.hasMany(Comment, { foreignKey: "client_comment" });
Comment.belongsTo(Client, {
  as: "client_comment_id",
  foreignKey: "client_comment",
});

Tenant.hasMany(Comment, { foreignKey: "tenant_comment" });
Comment.belongsTo(Tenant, {
  as: "tenant_comment_id",
  foreignKey: "tenant_comment",
});

Property.hasMany(Comment, { as: "p_comment", foreignKey: "property_comment" });
Comment.belongsTo(Property, {
  as: "property_comment_id",
  foreignKey: "property_comment",
});

// Relation Payment

Client.hasMany(Payments, { foreignKey: "client_payment" });
Payments.belongsTo(Client, { foreignKey: "client_payment" });

// Relation ClientRecord

Client.hasMany(ClientRecord, {
  as: "client_record_id",
  foreignKey: "client_record",
});
ClientRecord.belongsTo(Client, {
  as: "record_client",
  foreignKey: "client_record",
});

// Routes
app.use(clientRoutes);
app.use(tenantRoutes);
app.use(propertyRoutes);
app.use(commentRoutes);
app.use(otherRoutes);
app.use(payRoutes);
app.use(adminRoutes);

export default app;
