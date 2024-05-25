import { IProfile } from "./profile.interface";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profile: IProfile;
}
