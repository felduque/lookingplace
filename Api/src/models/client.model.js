import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

export const Client = sequelize.define("Clients", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  avatar: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  verify: {
    type: DataTypes.BOOLEAN,
  },
});
