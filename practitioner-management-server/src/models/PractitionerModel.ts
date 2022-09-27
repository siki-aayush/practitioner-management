import db from "../db/db";
import { LIMIT_PER_PAGE } from "../constants/common";
import { Practitioner, PractitionerToCreate } from "../domain/Practitioner";

class PractitionerModel {
  public static table = "practitioner";

  /**
   * Gets all the practitioners
   * @param  {number} page
   */
  public static async getAllPractitioner(page: number) {
    const offset = (page - 1) * LIMIT_PER_PAGE;
    const allPracitioners = await db(PractitionerModel.table)
      .orderBy("name", "asc")
      .offset(offset)
      .limit(LIMIT_PER_PAGE);

    return allPracitioners;
  }

  /**
   * Gets practitioner by their id
   * @param  {number} id
   */
  public static async getPractitionerById(id: number) {
    const practitioner = await db(PractitionerModel.table)
      .where({ id })
      .first();

    return practitioner;
  }

  /**
   * Gets practitioner by name
   * @param  {string} name
   */
  public static async getPractitionerByName(name: string) {
    const practitioner = await db(PractitionerModel.table)
      .where({ name })
      .first();

    return practitioner;
  }

  /**
   * Creates a new practitioner
   * @param  {PractitionerToCreate} practitioner
   */
  public static async createPractitioner(practitioner: PractitionerToCreate) {
    const newPractitioner = await db(PractitionerModel.table)
      .insert(practitioner)
      .returning("*");

    return newPractitioner;
  }

  /**
   * Updates the values of the practitioner on the database
   * @param  {Practitioner} practitioner
   */
  public static async updatePractitioner(practitioner: Practitioner) {
    const updatedPractitioner = await db(PractitionerModel.table)
      .where({ id: practitioner.id })
      .update(practitioner)
      .returning("*");

    return updatedPractitioner;
  }

  /**
   * Deletes the practitioner
   * @param  {number} id
   */
  public static async deletePractitioner(id: number) {
    await db(PractitionerModel.table).where({ id }).del();

    return;
  }
}

export default PractitionerModel;
