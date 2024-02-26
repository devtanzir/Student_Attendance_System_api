import error from "../utils/error.utils.js";
import { findUserByProperty, findUsers } from "./User_Service.js";

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
