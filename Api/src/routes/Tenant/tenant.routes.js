import {
  createTenant,
  getTenant,
  getTenantById,
  updateTenant,
  validateTenant,
  login,
  logout,
  refreshToken,
  forgot,
  verifyPassword,
  resetPassword,
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
router.post("/tenant/login", login);
router.get("/logout", logout);
router.get("/refreshToken", refreshToken);
router.post("/forgot", forgot);
router.get("/tenant/reset/:id/:token", verifyPassword);
router.post("/tenant/reset/:id/:token", resetPassword);
router.get("/tenant/gettenant", getTenant);
router.get("/tenant/gettenant/:id", getTenantById);
router.patch("/tenant/updatetenant/:id", updateTenant);
router.post("/tenant/validatetenant", validateTenant);
export default router;
