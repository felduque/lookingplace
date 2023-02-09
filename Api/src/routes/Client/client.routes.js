import {
  createAboutme,
  createClient,
  deleteClient,
  getClient,
  getClientById,
  updateClient,
  login,
  logout,
  refreshToken,
  forgot,
  verifyPassword,
  resetPassword,
} from "../../controllers/Client/client.controller.js";
import { Router } from "express";

const router = Router();
router.post("/client/aboutme", createAboutme);
router.post("/client/createuser", createClient);
router.post("/client/login", login);
router.get("/client/logout", logout);
router.get("/client/refreshToken", refreshToken);
router.post("/client/forgot", forgot);
router.get("/reset/:id/:token", verifyPassword);
router.post("/reset/:id/:token", resetPassword);
router.get("/client/getuser", getClient);
router.get("/client/getuser/:id", getClientById);
router.patch("/client/updateuser/:id", updateClient);
router.delete("/client/deleteuser/:id", deleteClient);
router.delete("/client/deleteuser/:id", deleteClient);

export default router;
