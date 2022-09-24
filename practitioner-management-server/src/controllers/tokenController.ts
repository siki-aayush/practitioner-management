import * as tokenService from "../services/tokenService";
import { NextFunction, Request, Response } from "express";

export const generateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken, id } = req.body;
  tokenService
    .generateToken(refreshToken, +id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
