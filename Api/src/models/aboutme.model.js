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
    validator: {
      len: {
        args: [3, 300],
        msg: "Description needs to have between 3 to 300 characters",
      },
      notNull: {
        args: true,
        msg: "Cannot be null",
      },
    },
  },
  hobbies: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  age: {
    type: DataTypes.INTEGER,
  },
  from: {
    type: DataTypes.STRING,
    validate: {
      len: {
        args: [3, 80],
        msg: "Please write between 3 and 80 characters",
      },
    },
  },
});
