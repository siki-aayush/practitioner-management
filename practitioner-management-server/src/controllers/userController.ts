import { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../constants/common";

/**
 * Gets all the users
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  userService
    .getAllUsers()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Gets a user by id
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  userService
    .getUserById(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Gets a user by email
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const getUserByEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  userService
    .getUserByEmail(email)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Creates a new user
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;

  // Generates a hash for the password
  bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    userService
      .createUser({ ...req.body, password: hash })
      .then((data) => res.json(data))
      .catch((error) => next(error));
  });
};

/**
 * Updates a user (either it's name email or password)
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { password } = req.body;

  bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    userService
      .updateUser({ ...req.body, password: hash, id: +id })
      .then((data) => res.json(data))
      .catch((error) => next(error));
  });
};

/**
 * Delets a user by id
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  userService
    .deleteUser(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const userLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  userService
    .loginUser(email, password)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
