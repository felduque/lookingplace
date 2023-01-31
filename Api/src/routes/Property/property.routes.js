import { 
  createProperty,
  getProperty
 } from "../../controllers/Property/property.controller.js";
import { Router } from "express";
  
  const router = Router();
  
  router.post("/property", createProperty);
  router.get("/getproperty", getProperty);
  export default router;