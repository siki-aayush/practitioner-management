import { UserToGet } from "./User";

export interface Token {
  accessToken: string;
  refreshToken: string;
  user: UserToGet;
}
