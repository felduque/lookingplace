import { Router } from "express";
import {
  createClientRecord,
  getAllClientsRecords,
  getPropertiesById,
  updatePropertyById,
  getClientsById,
  clientRecordsGet,
} from "../../controllers/Other/admin.controller.js";

const router = Router();

router.get("/admin/users/clientsrecords", getAllClientsRecords);
router.post("/admin/create/clientrecord", createClientRecord);
router.get("/admin/users/client/:id", getClientsById);
router.get("/admin/properties/:id", getPropertiesById);
router.get("/admin/get", clientRecordsGet);
router.patch("/admin/property/edit/:id", updatePropertyById);

export default router;
