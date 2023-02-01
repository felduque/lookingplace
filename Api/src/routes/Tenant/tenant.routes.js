import {
  createTenant,
  getTenant,
  getTenantById,
  updateTenant,
  validateTenant,
} from "../../controllers/Tenant/tenant.controller.js";
import { Router } from "express";

const router = Router();

router.post("/tenant/createtenant", createTenant);
router.get("/tenant/gettenant", getTenant);
router.get("/tenant/gettenant/:id", getTenantById);
router.patch("/tenant/updatetenant/:id", updateTenant);
router.post("/tenant/validatetenant", validateTenant);
export default router;
