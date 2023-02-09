import {
  createProperty,
  deleteProperty,
  getProperty,
  getPropertyById,
  updateProperty,
  patchBookingsProperty,
} from "../../controllers/Property/property.controller.js";
import { Router } from "express";

const router = Router();

router.patch("/property/update/bookings", patchBookingsProperty);
router.post("/property", createProperty);
router.get("/properties", getProperty);
router.get("/property/:id", getPropertyById);
router.delete("/property/delete/:id", deleteProperty);
router.patch("/property/edit/:id", updateProperty);

export default router;
