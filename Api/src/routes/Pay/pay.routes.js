import {
  paySuscription,
  payProperty,
} from "../../controllers/Pay/pay.controller.js";

import { Router } from "express";

const router = Router();

router.post("/pago", paySuscription);
router.post("/checkOut/pagoProperty", payProperty);
export default router;
