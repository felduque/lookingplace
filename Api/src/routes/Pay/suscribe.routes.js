import {
    createSubscription
  } from "../../controllers/Pay/suscribe.controller.js";
  
  import { Router } from "express";
  const router = Router();

router.post('/pay/create-subscription', createSubscription);
export default router;