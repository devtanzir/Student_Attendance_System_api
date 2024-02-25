import { registerService } from "../service/Auth_Service.js";
import { findUserByProperty, findUsers } from "../service/User_Service.js";
import error from "../utils/error.utils.js";

export const getAllUsers = async (_req, res, next) => {
  try {
    const users = await findUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

export const postUser = async (req, res, next) => {
  const { name, email, password, roles, AccountStatus } = req.body;

  try {
    const user = await registerService({
      name,
      email,
      password,
      roles,
      AccountStatus,
    });
    return res.status(201).json({ message: "user Created Successfully", user });
  } catch (e) {
    next(e);
  }
};

export const patchUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { name, roles, AccountStatus } = req.body;

  try {
    const user = await findUserByProperty("_id", userId);

    if (!user) throw error("user not found", 404);

    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.AccountStatus = AccountStatus ?? user.AccountStatus;

    await user.save();
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await findUserByProperty("_id", userId);

    if (!user) throw error("user not found", 404);
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await findUserByProperty("_id", userId);

    if (!user) throw error("user not found", 404);
    await user.deleteOne(user);
    return res.status(203).send();
  } catch (e) {
    next(e);
  }
};
