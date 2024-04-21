import { type Gender, type UserDoc, UserModel, type UserPurpose } from '../models/user.js';
import { hashPassword } from './auth.js';

export const createNewUser = async (params: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthDate: Date;
  gender: Gender;
  purpose: UserPurpose;
  location: [number, number];
  photos: string[];
}): Promise<UserDoc> => {
  const { email, firstName, lastName, password, birthDate, gender, purpose, location, photos } = params;

  const hashedPassword = hashPassword(password);

  const user = new UserModel({
    email,
    firstName,
    lastName,
    password: hashedPassword,
    birthDate,
    gender,
    purpose,
    location,
    photos,
  });
  return await user.save();
};

export const userExists = async (email: string) => await UserModel.exists({ email });
