import { NextFunction, Request, Response } from "express";
import * as practitionerService from "../services/practitionerService";

/**
 * Fetches all the practitioners
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const getAllPractitioner = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page } = req.query;
  practitionerService
    .getAllPractitioner(page ? +page : 1)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Fetches a practitioner with matching id
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const getPractitionerById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  practitionerService
    .getPractitionerById(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/** Fetch a practitioner with matching name
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const getPractitionerByName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  practitionerService
    .getPractitionerByName(name)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Creates a new practitioner
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const createPractitioner = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    phone,
    email,
    address,
    working_days,
    start_time,
    end_time,
    dob,
  } = req.body;
  const fileString = req.file?.path as string;

  practitionerService
    .createPractitioner(
      {
        name,
        phone,
        email,
        address,
        working_days,
        start_time,
        end_time,
        dob,
      },
      fileString
    )
    .then((data) => res.json(data))
    .catch((error) => next(error));
};

/**
 * Updates an existing practitioner
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const updatePractitioner = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const {
    name,
    phone,
    email,
    address,
    cloud_public_id,
    working_days,
    start_time,
    end_time,
    dob,
  } = req.body;
  const fileString = req.file?.path as string;
  practitionerService
    .updatePractitioner(
      {
        id: +id,
        name,
        phone,
        email,
        address,
        working_days,
        start_time,
        end_time,
        dob,
        cloud_public_id: cloud_public_id as string,
      },
      fileString
    )
    .then((data) => res.json(data))
    .catch((error) => next(error));
};

/**
 * Deletes the practitioner
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const deletePractitioner = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  practitionerService
    .deletePractitioner(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
