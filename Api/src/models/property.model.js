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
      is: {
        args: /^[A-Za-z ]+$/,
        msg: "solo letras",
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
  checkIn: {
    type: DataTypes.STRING,
    defaultValue: "00:00",
  },
  checkOut: {
    type: DataTypes.STRING,
    defaultValue: "00:00",
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
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
  beds: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: 1,
        msg: "Minimum value is 1",
      },
    },
  },
  baths: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: 1,
        msg: "Minimum value is 1",
      },
    },
  },
  services: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  smoke: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  party: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  pets: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
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
  lat: {
    type: DataTypes.FLOAT,
  },
  lng: {
    type: DataTypes.FLOAT,
  },
});
