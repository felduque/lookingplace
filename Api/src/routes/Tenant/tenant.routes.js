import {
  createTenant,
  getTenant,
  getTenantById,
  updateTenant,
  validateTenant,
} from "../../controllers/Tenant/tenant.controller.js";
import { Router } from "express";
import multer from "multer";
import { uploadImageTenant } from "../../firebase/firebase.js";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post(
  "/tenant/createtenant",
  upload.single("image"),
  uploadImageTenant,
  createTenant
);
router.get("/tenant/gettenant", getTenant);
router.get("/tenant/gettenant/:id", getTenantById);
router.patch("/tenant/updatetenant/:id", updateTenant);
router.post("/tenant/validatetenant", validateTenant);
export default router;
