import { NextFunction, Request, Response } from "express";
import logger from "../misc/logger";
import jwt from "jsonwebtoken";
import CustomError from "../misc/CustomError";
import { StatusCodes } from "http-status-codes";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  logger.info("verifying token!!");

  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(
      bearerToken,
      process.env.JWT_SECRET as string,
      (err, decoded) => {
        if (err) {
          next(new CustomError("Invalid token", StatusCodes.UNAUTHORIZED));
        } else {
          next();
        }
      }
    );
  } else {
    next(new CustomError("Invalid token", StatusCodes.FORBIDDEN));
  }
};

export default verifyToken;
