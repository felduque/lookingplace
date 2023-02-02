import {
  createAboutme,
  createClient,
  deleteClient,
  getClient,
  getClientById,
  updateClient,
  validateClient,
  login,
} from "../../controllers/Client/client.controller.js";
import { Router } from "express";

const router = Router();
router.post("/client/aboutme", createAboutme);
router.post("/client/createuser", createClient);
router.post("/login", login);
router.get("/client/getuser", getClient);
router.get("/client/getuser/:id", getClientById);
router.patch("/client/updateuser/:id", updateClient);
router.delete("/client/deleteuser/:id", deleteClient);
router.post("/client/validateuser", validateClient);
router.delete("/client/deleteuser/:id", deleteClient);

export default router;
