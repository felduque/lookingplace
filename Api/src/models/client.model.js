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
      notNull: {
        msg: "Cannot be null",
      },
      len: {
        args: [3, 255],
        msg: "Name need at least 3 letters",
      },
      isAlpha: {
        args: true,
        msg: "A name is needed (only letters)",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: {
        args: true,
        msg: "An email is needed",
      },
    },
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue:
      "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
    validate: {
      isUrl: {
        msg: "A URL is required",
      },
    },
  },
  password: {
    type: DataTypes.STRING(300),
  },
  phone: {
    type: DataTypes.INTEGER(15),
    allowNull: false,
    unique: true,
  },
  verify: {
    type: DataTypes.BOOLEAN,
  },
  verifyImg: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
});
