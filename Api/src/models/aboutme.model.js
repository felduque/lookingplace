import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

export const Aboutme = sequelize.define("Aboutmes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  /**
   * !Cambiar en caso de querer descripciones más largas (DataType.text(numero deseado) y el max:{}
   */
  description: {
    type: DataTypes.TEXT(1500),
    validate: {
      min: {
        args: 10,
        msg: "Description at least needs to be 10 characters",
      },
      max: {
        args: 1500,
        msg: "Max characters has been reached",
      },
    },
  },
  hobbies: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: {
        args: true,
        msg: "Age needs to be a number",
      },
      min: {
        args: 15,
        msg: "Minimum age is 15",
      },
      max: {
        args: 150,
        msg: "Needs to be a real age",
      },
    },
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
