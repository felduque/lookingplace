import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

export const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.TEXT(280),
    allowNull: false,
    valiate: {
      min: {
        args: 4,
        msg: "Your comment needs at least 4 characters",
      },
      max: {
        args: 280,
        msg: "Your comment already exceeded the maximum of characters (280)",
      },
    },
  },
});
