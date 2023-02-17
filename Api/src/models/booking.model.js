import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

export const Booking = sequelize.define("Bookings", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bookingsPropCli: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
});
