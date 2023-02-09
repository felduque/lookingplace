import {
  createProperty,
  deleteProperty,
  getProperty,
  getPropertyById,
  updateProperty,
  postBookingsProperty,
} from "../../controllers/Property/property.controller.js";
import { Router } from "express";

const router = Router();

router.post("/property/update/bookings", postBookingsProperty);
router.post("/property", createProperty);
router.get("/properties", getProperty);
router.get("/property/:id", getPropertyById);
router.delete("/property/delete/:id", deleteProperty);
router.patch("/property/edit/:id", updateProperty);

export default router;