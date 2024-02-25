import error from "../utils/error.utils.js";
import bcrypt, { compare, genSalt } from "bcrypt";
import Jwt from "jsonwebtoken";
import { createNewUser, findUserByProperty } from "./User_Service.js";

export const registerService = async ({ name, email, password }) => {
  let user = await findUserByProperty("email", email);
  if (user) throw error("User Already Exist !", 400);

  const salt = await genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return createNewUser({ name, email, password: hash });
};

export const loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);
  if (!user) throw error("Invalid Credentials", 400);

  const isMatch = compare(password, user.password);

  if (!isMatch) {
    throw error("Invalid Credentials", 400);
  }
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    AccountStatus: user.AccountStatus,
  };
  delete user._doc.password;
  return Jwt.sign(payload, "my-secret-key", { expiresIn: "2h" });
};
