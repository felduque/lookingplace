import {
  createTenant,
  getTenant,
} from "../../controllers/Tenant/tenant.controller.js";
import { Router } from "express";

const router = Router();

router.post("/createtenant", createTenant);
router.get("/gettenant", getTenant);
export default router;
