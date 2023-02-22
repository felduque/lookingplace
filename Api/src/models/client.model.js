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
    validate: {
      is: {
        args: /^[A-Za-z ]+$/,
        msg: "solo letras",
      },
      len: {
        args: [3, 100],
        msg: "name needs to have between 3 to 100 characters",
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
    defaultValue:
      "https://img.asmedia.epimg.net/resizer/lOsBquRkmQ0wwhs_Vda4olIUINM=/1952x1098/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/ZD6DKSW2NFKNFN2UYVVA4C6G6E.jpg",
  },
  password: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isInt: {
        args: true,
        msg: "Only numeric values",
      },
      len: {
        args: [9, 15],
        msg: "Phone number needs to have between 9 and 15 numbers",
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
  favorites: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
});
