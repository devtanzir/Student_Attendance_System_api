import error from "../utils/error.utils.js";
import bcrypt, { compare, genSalt } from "bcrypt";
import Jwt from "jsonwebtoken";
import {
  createNewUser,
  findUserByProperty,
  findUsers,
} from "./User_Service.js";

export const registerService = async ({
  name,
  email,
  password,
  roles,
  AccountStatus,
}) => {
  let user = await findUserByProperty("email", email);
  if (user) throw error("User Already Exist !", 400);

  const salt = await genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return createNewUser({ name, email, password: hash, roles, AccountStatus });
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

export const getUsersService = async () => {
  return await findUsers();
};

export const updateService = async ({ userId, name, roles, AccountStatus }) => {
  const user = await findUserByProperty("_id", userId);

  if (!user) throw error("user not found", 404);

  user.name = name ?? user.name;
  user.roles = roles ?? user.roles;
  user.AccountStatus = AccountStatus ?? user.AccountStatus;

  return await user.save();
};

export const getUserService = async ({ userId }) => {
  const user = await findUserByProperty("_id", userId);

  if (!user) throw error("user not found", 404);

  return user;
};

export const deleteService = async ({ userId }) => {
  const user = await findUserByProperty("_id", userId);

  if (!user) throw error("user not found", 404);
  return await user.deleteOne(user);
};
