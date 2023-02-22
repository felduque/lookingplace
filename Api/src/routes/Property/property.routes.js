import {
  createProperty,
  deleteProperty,
  getProperty,
  getPropertyById,
  updateProperty,
  patchBookingsProperty,
  createBulkProperty,
  patchProProperty,
} from "../../controllers/Property/property.controller.js";
import { Router } from "express";

const router = Router();

import multer from "multer";
import { uploadImageProperty } from "../../firebase/firebase.js";

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/property",
  upload.any("image", 5),
  uploadImageProperty,
  createProperty
);
router.patch("/property/update/bookings", patchBookingsProperty);
router.patch("/property/update/pro", patchProProperty);
router.get("/properties", getProperty);
router.get("/property/:id", getPropertyById);
router.delete("/property/delete/:id", deleteProperty);
router.patch("/property/edit/:id", updateProperty);
router.post("/bulk/create", createBulkProperty);

export default router;
