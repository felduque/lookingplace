import {
  createProperty,
  getProperty,
  getPropertyById,
} from "../../controllers/Property/property.controller.js";
import { Router } from "express";

const router = Router();

router.post("/property/createproperty", createProperty);
router.get("/property/getproperty", getProperty);
router.get("/property/:id", getPropertyById);
export default router;
