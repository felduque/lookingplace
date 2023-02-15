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
  updateAvatar,
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
router.get("/tenant/logout", logout);
router.get("/tenant/refreshToken", refreshToken);
router.post("/tenant/forgot", forgot);
router.get("/tenant/reset/:id/:token", verifyPassword);
router.post("/tenant/reset/:id/:token", resetPassword);
router.get("/tenant/gettenant", getTenant);
router.get("/tenant/gettenant/:id", getTenantById);
router.patch("/tenant/updatetenant/:id", updateTenant);
router.patch(
  "/tenant/updateavatar/:id",
  upload.single("image"),
  uploadImageTenant,
  updateAvatar
);
router.post("/tenant/validatetenant", validateTenant);
export default router;
