import { Property } from "../../models/property.model.js";
import { Client } from "../../models/client.model.js";
import { Booking } from "../../models/booking.model.js";
import { Tenant } from "../../models/tenant.model.js";

export const createBooking = async (req, res) => {
  const { bookingsPropCli, booking_client, booking_property, booking_tenant } =
    req.body;
  console.log(req.body);

  const bookingCreate = await Booking.create({
    bookingsPropCli,
  });

  let tenantSearch = await Tenant.findOne({
    where: {
      id: booking_tenant,
    },
  });

  await tenantSearch.addBooking(bookingCreate.id);

  const clientSearch = await Client.findOne({
    where: {
      id: booking_client,
    },
  });

  await clientSearch.addBooking(bookingCreate.id);

  const propertySearch = await Property.findOne({
    where: {
      id: booking_property,
    },
  });

  await propertySearch.addBooking(bookingCreate.id);

  return res.json(bookingCreate);
};

export const getBookings = async (req, res) => {
  const bookingTotal = await Booking.findAll();

  res.json(bookingTotal);
};
