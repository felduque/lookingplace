import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";
export const Payments = sequelize.define(
  "payments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    tenantIdPay: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);
