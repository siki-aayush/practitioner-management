import { Router } from "express";
import upload from "../config/multer";
import * as practitionerController from "../controllers/practitionerController";

const router = Router();

router.get("/", practitionerController.getAllPractitioner);
router.post(
  "/add",
  upload.single("photograph"),
  practitionerController.createPractitioner
);
router.get("/:id", practitionerController.getPractitionerById);
router.put(
  "/:id",
  upload.single("photograph"),
  practitionerController.updatePractitioner
);
router.delete("/:id", practitionerController.deletePractitioner);
router.post("/name", practitionerController.getPractitionerByName);

export default router;
