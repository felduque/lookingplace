import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

export const ClientRecord = sequelize.define("ClientRecords", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
