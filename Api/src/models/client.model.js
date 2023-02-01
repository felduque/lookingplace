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
      isAlpha: {
        args: true,
        msg: "only letters",
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
      "https://img2.freepng.es/20180418/wve/kisspng-refilmery-computer-icons-avatar-user-profile-avatar-vector-5ad7bb8f659906.3642332415240876954162.jpg",
    validate: {
      isUrl: {
        args: true,
        msg: "Please enter a URL",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      isInt: {
        args: true,
        msg: "Only numbers please",
      },
      max: {
        args: 15,
        msg: "The maximum number of numbers are 15",
      },
      min: {
        args: 11,
        msg: "The minimum number of numbers are 11",
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
});
