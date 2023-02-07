import { Router } from "express";
import { getAllClients } from "../../controllers/Other/admin.controller.js";

const router = Router();

router.get("/admin/users/clients", getAllClients);

export default router;
