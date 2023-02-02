import { createProperty } from "../../controllers/Property/property.controller.js";
import { Router } from "express";

const router = Router();

router.post("/property", createProperty);
export default router;
