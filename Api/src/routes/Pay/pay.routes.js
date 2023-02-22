import {
  paySuscription,
  payProperty,
  sendEmailFromPay,
  sendEmailCancelBook,
} from "../../controllers/Pay/pay.controller.js";

import { Router } from "express";

const router = Router();

router.post("/sendEmail/pay", sendEmailFromPay);
router.post("/cancel/book", sendEmailCancelBook);
router.post("/pago", paySuscription);
router.post("/checkOut/pagoProperty", payProperty);
export default router;
