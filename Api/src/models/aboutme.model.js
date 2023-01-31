import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

export const Aboutme = sequelize.define("Aboutmes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
  hobbies: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  age: {
    type: DataTypes.INTEGER,
  },
  from: {
    type: DataTypes.STRING,
  },
});
