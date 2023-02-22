import {
  createAboutme,
  createClient,
  deleteClient,
  getClient,
  getClientById,
  updateClient,
  login,
  forgot,
  verifyPassword,
  resetPassword,
  updateAvatar,
  clientData,
} from "../../controllers/Client/client.controller.js";
//import jwt from "jsonwebtoken";
import multer from "multer";
import { uploadImageClient } from "../../firebase/firebase.js";
import { Router } from "express";
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

/*const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, secretjwt);
    req.user = decodedToken.userInfo;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};*/

router.post("/client/aboutme", createAboutme);
router.post(
  "/client/createuser",
  upload.single("image"),
  uploadImageClient,
  createClient
);
router.post("/client/login", login);
router.post("/client/userData", clientData);
router.post("/client/forgot", forgot);
router.get("/client/reset/:id/:token", verifyPassword);
router.post("/client/reset/:id/:token", resetPassword);
router.get("/client/getuser", /*verifyToken,*/ getClient);
router.get("/client/getuser/:id", /*verifyToken,*/ getClientById);
router.patch("/client/updateuser/:id", /*verifyToken,*/ updateClient);
router.patch(
  "/client/updateavatar/:id",
  upload.single("image"),
  uploadImageClient,
  updateAvatar
);
router.delete("/client/deleteuser/:id", /*verifyToken,*/ deleteClient);

export default router;
