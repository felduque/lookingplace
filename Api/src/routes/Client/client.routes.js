import {
  createAboutme,
  createClient,
  deleteClient,
  getClient,
  getClientById,
  updateClient,
  validateClient,
} from "../../controllers/Client/client.controller.js";
import { Router } from "express";

const router = Router();
router.post("/client/aboutme", createAboutme);
router.post("/client/createuser", createClient);
router.get("/client/getuser", getClient);
router.get("/client/getuser/:id", getClientById);
router.patch("/client/updateuser/:id", updateClient);
router.delete("/client/deleteuser/:id", deleteClient);
router.post("/client/validateuser", validateClient);

export default router;
