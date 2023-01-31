import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

export const Propierty = sequelize.define("Propierty", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  capacity: {
    type: DataTypes.INTEGER,
  },
  image: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  rating: {
    type: DataTypes.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      max: 5,
      min: 0,
    },
  },
});
