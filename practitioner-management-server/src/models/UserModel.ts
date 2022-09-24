import db from "../db/db";
import { User, UserToCreate } from "../domain/User";

class UserModel {
  public static table = "user_account";

  /**
   * Gets all the users from database
   */
  public static async getAllUsers() {
    const users = await db(UserModel.table).select("id", "email");

    return users;
  }

  /**
   * Gets a user by id from database
   * @param  {number} id
   */
  public static async getUserById(id: number) {
    const user = await db(UserModel.table).where({ id }).first();

    return user;
  }

  /**
   * Gets the user by email from database
   * @param  {string} email
   */
  public static async getUserByEmail(email: string) {
    const user = await db(UserModel.table).where({ email }).first();

    return user;
  }

  /**
   * Creates a new user on the database
   * @param  {UserToCreate} user
   */
  public static async createUser(user: UserToCreate) {
    const newUser = await db(UserModel.table).insert(user, ["id", "email"]);

    return newUser;
  }

  /**
   * Updates the user on the database
   * @param  {User} user
   */
  public static async updateUser(user: User) {
    const [updatedUser] = await db(UserModel.table)
      .where({ id: user.id })
      .update(user)
      .returning(["id", "email"]);

    return updatedUser;
  }

  /**
   * Deletes the user from the database
   * @param  {number} id
   */
  public static async deleteUser(id: number) {
    await db(UserModel.table).where({ id }).delete();
  }
}

export default UserModel;
