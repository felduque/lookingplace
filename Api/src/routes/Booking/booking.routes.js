import {
  createBooking,
  getBookings,
} from "../../controllers/Booking/booking.controller.js";

import { Router } from "express";

const router = Router();

router.post("/createBooking", createBooking);
router.get("/getBookings", getBookings);
export default router;
