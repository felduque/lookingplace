import { Router } from "express";
import {
  createPayment,
  getPayment,
} from "../../controllers/Other/payment.controller.js";
const router = Router();

router.post("/pay/payment", createPayment);
router.get("/pay/getpayment", getPayment);
export default router;
