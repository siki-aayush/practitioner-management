import { NextFunction, Request, Response, Router } from "express";

import practitionerRoutes from "./practitionerRoutes";
import * as userController from "../controllers/userController";
import * as tokenController from "../controllers/tokenController";

import userRoutes from "./userRoutes";
import auth from "../middlewares/auth";

const router = Router();

router.get("/app", (_req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "you are inside app!!",
  });
});

router.post("/login", userController.userLogin);
router.post("/refresh", tokenController.generateToken);
router.post("/register", userController.createUser);

router.use(auth);

router.use("/users", userRoutes);

router.use("/practitioner", practitionerRoutes);

export default router;
