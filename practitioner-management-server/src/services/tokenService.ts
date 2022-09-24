import jwt from "jsonwebtoken";
import logger from "../misc/logger";
import Succes from "../domain/Success";
import { Token } from "../domain/Token";

import UserModel from "../models/UserModel";

export const generateToken = async (
  refreshToken: string,
  id: number
): Promise<Succes<Token>> => {
  const user = await UserModel.getUserById(id);

  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
    const accessToken = jwt.sign(user, process.env.JWT_SECRET as string, {
      expiresIn: "1m",
    });
    const newRefreshToken = jwt.sign(
      user,
      process.env.REFRESH_TOKEN_SECRET as string
    );

    return {
      data: { accessToken, user, refreshToken: newRefreshToken },
      message: "Successfully retrieved new tokens",
    };
  } catch (error) {
    logger.info(error);

    return {
      message: "Refresh token is invalid!!",
    };
  }
};
