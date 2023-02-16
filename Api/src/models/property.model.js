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
  },
  description: {
    type: DataTypes.TEXT,
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
  },
  beds: {
    type: DataTypes.INTEGER,
  },
  baths: {
    type: DataTypes.INTEGER,
  },
  services: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  smoke: {
    type: DataTypes.BOOLEAN,
  },
  party: {
    type: DataTypes.BOOLEAN,
  },
  pets: {
    type: DataTypes.BOOLEAN,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  image: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  rating: {
    type: DataTypes.DECIMAL(10, 1),
  },
  lat: {
    type: DataTypes.FLOAT,
  },
  lng: {
    type: DataTypes.FLOAT,
  },
  country: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  region: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  bookings: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
});
