import {
  deleteService,
  getUserService,
  getUsersService,
  registerService,
  updateService,
} from "../service/Auth_Service.js";

export const getAllUsers = async (_req, res, next) => {
  try {
    const users = await getUsersService();
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
    const user = await updateService({ userId, name, roles, AccountStatus });
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await getUserService({ userId });
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    deleteService({ userId });
    return res.status(203).send();
  } catch (e) {
    next(e);
  }
};
