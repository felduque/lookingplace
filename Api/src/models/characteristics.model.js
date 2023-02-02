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
    allowNull: false,
    validate: {
      is: {
        args: /^[A-Za-z ]+$/,
        msg: "solo letras",
      },
      len: {
        args: [3, 120],
        msg: "Name needs to have between 3 to 120 characters",
      },
      notNull: {
        args: true,
        msg: "Cannot be null",
      },
    },
  },
});
