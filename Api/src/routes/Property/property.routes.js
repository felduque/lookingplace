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

import multer from "multer";
import { uploadImageProperty } from "../../firebase/firebase.js";

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/property",
  upload.array("image", 5),
  uploadImageProperty,
  createProperty
);
router.patch("/property/update/bookings", patchBookingsProperty);
router.get("/properties", getProperty);
router.get("/property/:id", getPropertyById);
router.delete("/property/delete/:id", deleteProperty);
router.patch("/property/edit/:id", updateProperty);

export default router;
