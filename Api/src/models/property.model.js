import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

export const Property = sequelize.define("Property", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      isAlpha: {
        args: true,
        msg: "Only letters",
      },
      min: {
        args: 3,
        msg: "The name at least needs 3 characters",
      },
      max: {
        args: 60,
        msg: "Max characters are 60",
      },
      notNull: {
        args: true,
        msg: "Cannot be null",
      },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
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
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        args: true,
        msg: "Only numbers please",
      },
      min: {
        args: 1,
        msg: "1 is the lowest capacity",
      },
      max: {
        args: 30,
        msg: "30 is the max capacity for a room",
      },

      notNull: {
        args: true,
        msg: "Cannot be null",
      },
    },
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
