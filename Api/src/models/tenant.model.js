import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

export const Tenant = sequelize.define("Tenant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[A-Za-z ]+$/,
        msg: "solo letras",
      },
      min: {
        args: 3,
        msg: "the name at least needs 3 characters",
      },
      max: {
        args: 60,
        msg: "max characters are 60",
      },
      notNull: {
        args: true,
        msg: "cannot be null",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: "needs to be an email",
      },
      notNull: {
        args: true,
        msg: "cannot be null",
      },
    },
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isInt: {
        args: true,
        msg: "Only numeric value",
      },
      len: {
        args: [9, 15],
        msg: "The maximum number of numbers are 15",
      },
    },
  },
  verify: {
    type: DataTypes.BOOLEAN,
  },
  verifyImg: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
