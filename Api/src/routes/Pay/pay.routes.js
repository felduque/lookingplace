import { paySuscription } from "../../controllers/Pay/pay.controller.js";

import { Router } from "express";

const router = Router();

router.post("/pago", paySuscription);
export default router;