import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/email", userController.getUserByEmail);

export default router;
