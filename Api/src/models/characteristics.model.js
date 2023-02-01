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
      notNull: {
        args: true,
        msg: "Cannot be null",
      },
      isAlpha: {
        args: true,
        msg: "Only letters",
      },
      len: {
        args: [3, 40],
        msg: "Between 3 and 40 characters please.",
      },
    },
  },
});
