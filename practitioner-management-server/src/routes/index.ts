import { NextFunction, Request, Response, Router } from "express";
import * as userController from "../controllers/userController";
import * as tokenController from "../controllers/tokenController";

// import auth from "../middlewares/auth";
import userRoutes from "./userRoutes";

const router = Router();

router.get("/app", (_req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "you are inside app!!",
  });
});

router.post("/login", userController.userLogin);
router.post("/refresh", tokenController.generateToken);
router.post("/register", userController.createUser);

// router.use(auth);

router.use("/users", userRoutes);

export default router;
