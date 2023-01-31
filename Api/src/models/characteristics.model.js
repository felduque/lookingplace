import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

export const Character = sequelize.define("Characters", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});
