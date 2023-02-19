import {
  createBooking,
  getBookings,
  deleteBooking,
} from "../../controllers/Booking/booking.controller.js";

import { Router } from "express";

const router = Router();

router.post("/createBooking", createBooking);
router.get("/getBookings", getBookings);
router.delete("/deleteBooking/:idBooking", deleteBooking);
export default router;
