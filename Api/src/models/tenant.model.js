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
  isPro: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
});
