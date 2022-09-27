import fs from "fs";
import logger from "../misc/logger";
import Succes from "../domain/Success";
import PractitionerModel from "../models/PractitionerModel";
import { v2 as cloudinary } from "cloudinary"; // This should always come after the practitioner model in imported otherwise the cloudinary config won't get setup for some reason
import {
  Practitioner,
  PractitionerBeforeUpload,
  PractitionerToGet,
  PractitionerToUpdate,
} from "../domain/Practitioner";
import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  UPLOAD_PRESET,
} from "../constants/common";

/**
 * Fetches all the practitioner informations
 * @param  {number} page
 * @returns Promise
 */
export const getAllPractitioner = async (
  page: number
): Promise<Succes<PractitionerToGet>> => {
  logger.info("Getting all practitioners!!");

  // Fetches all the practitioner from the database
  const allPracitioners = await PractitionerModel.getAllPractitioner(page);

  return {
    data: allPracitioners,
    message: "Successfully fetched all practitioner!!",
  };
};

/**
 * Fetches the practitioner with the same id
 * @param  {number} id
 * @returns Promise
 */
export const getPractitionerById = async (
  id: number
): Promise<Succes<PractitionerToGet>> => {
  logger.info("Getting practitioner by id!!");

  // Fetches the practitioner matching the provided id
  const practitioner = await PractitionerModel.getPractitionerById(id);

  return {
    data: practitioner,
    message: "Successfully fetched practitioner by id!!",
  };
};

/**
 * Fetches the practitioner by name
 * @param  {string} name
 * @returns Promise
 */
export const getPractitionerByName = async (
  name: string
): Promise<Succes<Practitioner>> => {
  logger.info("Getting practitioner by id!!");

  // Fetches the practitioner with the matching name
  const practitioner = await PractitionerModel.getPractitionerByName(name);

  return {
    data: practitioner,
    message: "Successfully fetched practitioner by id!!",
  };
};

/**
 * Creates a new Practitioner row on the database
 * @param  {PractitionerBeforeUpload} practitioner
 * @param  {string} filePath
 * @returns Promise
 */
export const createPractitioner = async (
  practitioner: PractitionerBeforeUpload,
  filePath: string
): Promise<Succes<Practitioner>> => {
  logger.info("Creating a new practitioner!!");

  try {
    // checks if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error("File not found!!");
    }

    // uploads the image to cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      upload_preset: UPLOAD_PRESET,
      use_filename: true,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      crop: "limit",
    });

    // Create a new practitioner on the database
    const newPractitioner = await PractitionerModel.createPractitioner({
      ...practitioner,
      photograph: result.url,
      cloud_public_id: result.public_id,
    });

    return {
      data: newPractitioner,
      message: "Successfully created a practitioner",
    };
  } catch (error) {
    // Logs the error
    logger.error(error);

    return {
      message: "Could not create the practitioner!!",
    };
  } finally {
    // Deletes the file from the server
    fs.unlinkSync(filePath);
  }
};

/**
 * Updates the practitioner row
 * @param  {PractitionerToUpdate} practitioner
 * @param  {string} filePath
 * @returns Promise
 */
export const updatePractitioner = async (
  practitioner: PractitionerToUpdate,
  filePath: string
): Promise<Succes<Practitioner>> => {
  logger.info("Updating practitioner by id!!");

  try {
    // checks if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error("File not found!!");
    }

    // uploads the image to cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      upload_preset: UPLOAD_PRESET,
      use_filename: true,
      public_id: practitioner.cloud_public_id,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      crop: "limit",
    });

    // Create a new practitioner on the database
    const updatedPractitioner = await PractitionerModel.updatePractitioner({
      ...practitioner,
      photograph: result.url,
      cloud_public_id: result.public_id,
    });

    return {
      data: updatedPractitioner,
      message: "Successfully updated a practitioner",
    };
  } catch (error) {
    // Logs the error
    logger.error(error);

    return {
      message: "Could not update the practitioner!!",
    };
  } finally {
    // Deletes the file from the server
    fs.unlinkSync(filePath);
  }
};

export const deletePractitioner = async (
  id: number
): Promise<Succes<Practitioner>> => {
  logger.info("Deleting practitioner!!");

  // Gets the practitioner from id
  const practitioner = await PractitionerModel.getPractitionerById(id);

  // Deletes the image from the cloud
  await cloudinary.uploader.destroy(
    practitioner.cloud_public_id,
    (result: any) => {
      logger.info(result);
    }
  );

  // Deletes the practitioner from the database
  await PractitionerModel.deletePractitioner(id);

  return {
    message: "Successfully deleted practitioner!!",
  };
};
