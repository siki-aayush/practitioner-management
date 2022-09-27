import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Succes from "../domain/Success";
import { Token } from "../domain/Token";
import { User, UserToCreate, UserToGet } from "../domain/User";

import logger from "../misc/logger";
import UserModel from "../models/UserModel";
import { ACCESS_TOKEN_EXPIRE_TIME } from "../constants/common";

/**
 * Gets all the users
 * @returns Promise
 */
export const getAllUsers = async (): Promise<Succes<UserToGet>> => {
  logger.info("Getting all users!!");
  const users = await UserModel.getAllUsers();

  return {
    data: users,
    message: "Successfully retrieved all users",
  };
};

/**
 * Gets a user by id
 * @param  {number} id
 * @returns Promise
 */
export const getUserById = async (id: number): Promise<Succes<User>> => {
  logger.info("Getting user by id!!");
  const user = await UserModel.getUserById(id);

  if (user) {
    return {
      data: user,
      message: "Successfully retrieved user",
    };
  }

  return {
    message: "User not found",
  };
};

/**
 * Gets a user by email
 * @param  {string} email
 * @returns Promise
 */
export const getUserByEmail = async (email: string): Promise<Succes<User>> => {
  logger.info("Getting user by Email!!");
  const user = await UserModel.getUserByEmail(email);

  return {
    data: user,
    message: "Successfully retrieved user",
  };
};

/**
 * Creates a new user
 * @param  {UserToCreate} user
 * @returns Promise
 */
export const createUser = async (user: UserToCreate): Promise<Succes<User>> => {
  logger.info("Creating user!!");

  try {
    const newUser = await UserModel.createUser(user);

    return {
      data: newUser,
      message: "Successfully created user",
    };
  } catch (err) {
    logger.info(err);

    return {
      message: "Failed creating a new user",
    };
  }
};

/**
 * Updates a user (either it's name email or password)
 * @param  {User} user
 * @returns Promise
 */
export const updateUser = async (user: User): Promise<Succes<User>> => {
  logger.info("Updating user!!");
  const updatedUser = await UserModel.updateUser(user);

  return {
    data: updatedUser,
    message: "Successfully updated user",
  };
};

/**
 * Deletes a user by id
 * @param  {number} id
 */
export const deleteUser = async (id: number) => {
  logger.info("Deleting user!!");
  await UserModel.deleteUser(id);

  return {
    message: "Successfully deleted user",
  };
};

/**
 * Logs in a user and send the JWT token to the client
 * @param  {string} email
 * @param  {string} password
 * @returns Promise
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<Succes<Token>> => {
  logger.info("Logging in user!!");
  const user = await UserModel.getUserByEmail(email);

  // If no user is found then the user not found message is returned
  if (!user) {
    return {
      message: "User not found",
    };
  }

  // Checks whether the password matches or not
  const isCorrect = bcrypt.compareSync(password, user.password);

  // If the password matches then a new JWT token is created and send as response
  if (isCorrect) {
    const accessToken = jwt.sign(user, process.env.JWT_SECRET as string, {
      expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
    });
    const refreshToken = jwt.sign(
      user,
      process.env.REFRESH_TOKEN_SECRET as string
    );

    return {
      data: { accessToken, refreshToken, user },
      message: "Logged in successfully",
    };
  }

  // If password does not match then wrong password response is returned
  return {
    message: "Wrong password",
  };
};
