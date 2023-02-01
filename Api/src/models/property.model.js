import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

export const Property = sequelize.define("Property", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: "Cannot be null",
      },
      len: {
        args: [3, 100],
        msg: "Name need at least 3 letters",
      },
      isAlpha: {
        args: true,
        msg: "A name is needed (only letters)",
      },
    },
  },
  description: {
    type: DataTypes.TEXT(600),
    allowNull: false,
    validate: {
      notNull: {
        msg: "Cannot be null",
      },
      len: {
        args: [3, 600],
        msg: "Description at least need 3 characters",
      },
      isAlpha: {
        args: true,
        msg: "A name is needed (only letters)",
      },
    },
  },
  capacity: {
    type: DataTypes.INTEGER(30),
    allowNull: false,
    validate: {
      notNull: {
        msg: "Cannot be null",
      },
      isNumber: {
        args: true,
        msg: "Needs to be a number",
      },
      min: {
        args: 1,
        msg: "Minimum value is 1",
      },
      max: {
        args: 30,
        msg: "Max value is 30",
      },
    },
  },
  image: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue:
      "https://static.vecteezy.com/system/resources/thumbnails/000/350/646/small_2x/Real_Estate__281_29.jpg",
    valdiate: {
      notNull: {
        msg: "Cannot be null",
      },
      isUrl: {
        args: true,
        msg: "Needs to be a URL",
      },
    },
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
