import error from "../utils/error.utils.js";
import bcrypt, { genSalt } from "bcrypt";
import { createNewUser, findUserByProperty } from "./User_Service.js";

export const registerService = async ({ name, email, password }) => {
  let user = await findUserByProperty("email", email);
  if (user) throw error("User Already Exist !", 400);

  const salt = await genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return createNewUser({ name, email, password: hash });
};
