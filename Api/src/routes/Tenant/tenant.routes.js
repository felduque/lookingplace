import {
  createTenant,
  getTenant,
  getTenantById,
  updateTenant,
  validateTenant,
  login,
  forgot,
  verifyPassword,
  resetPassword,
  updateAvatar,
  deleteTenant,
<<<<<<< HEAD
  tenantData,
=======
  patchProTenant,
>>>>>>> d7978435510ac6d240860ca2387424fca8946816
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
router.post("/tenant/userData", tenantData);
router.post("/tenant/forgot", forgot);
router.get("/tenant/reset/:id/:token", verifyPassword);
router.post("/tenant/reset/:id/:token", resetPassword);
router.get("/tenant/gettenant", getTenant);
router.delete("/tenant/deletetenant/:id", deleteTenant);
router.get("/tenant/gettenant/:id", getTenantById);
router.patch("/tenant/updatetenant/:id", updateTenant);
router.patch("/tenant/updatePro", patchProTenant);
router.patch(
  "/tenant/updateavatar/:id",
  upload.single("image"),
  uploadImageTenant,
  updateAvatar
);
router.post("/tenant/validatetenant", validateTenant);
export default router;
