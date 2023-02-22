import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

export const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
    validator: {
      len: {
        args: [3, 300],
        msg: "Description needs to have between 3 to 300 characters",
      },
    },
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:
      "https://img.asmedia.epimg.net/resizer/lOsBquRkmQ0wwhs_Vda4olIUINM=/1952x1098/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/ZD6DKSW2NFKNFN2UYVVA4C6G6E.jpg",
  },
  calificacion: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
