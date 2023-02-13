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
  updateAvatar,
  loginGoogle,
} from "../../controllers/Client/client.controller.js";

import multer from "multer";
import { uploadImageClient } from "../../firebase/firebase.js";
import { Router } from "express";
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();
router.post("/client/aboutme", createAboutme);
router.post(
  "/client/createuser",
  upload.single("image"),
  uploadImageClient,
  createClient
);
router.post("/client/login", login);
router.get("/client/logout", logout);
router.get("/client/refreshToken", refreshToken);
router.post("/client/forgot", forgot);
router.get("/reset/:id/:token", verifyPassword);
router.post("/reset/:id/:token", resetPassword);
router.post("/loginGoogle", loginGoogle);
router.get("/client/getuser", getClient);
router.get("/client/getuser/:id", getClientById);
router.patch("/client/updateuser/:id", updateClient);
router.patch(
  "/client/updateavatar/:id",
  upload.single("image"),
  uploadImageClient,
  updateAvatar
);
router.delete("/client/deleteuser/:id", deleteClient);
router.delete("/client/deleteuser/:id", deleteClient);

export default router;
