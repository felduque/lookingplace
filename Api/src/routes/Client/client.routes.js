import {
  createAboutme,
  createClient,
  getClient,
} from "../../controllers/Client/client.controller.js";
import { Router } from "express";

const router = Router();

router.post("/aboutme", createAboutme);
router.post("/createuser", createClient);
router.get("/getuser", getClient);
export default router;
