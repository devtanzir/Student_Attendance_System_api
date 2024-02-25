import { User } from "../models/User.model.js";

export const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

export const findUsers = () => {
  return User.find();
};

export const createNewUser = ({
  name,
  email,
  password,
  roles,
  AccountStatus,
}) => {
  const user = new User({
    name,
    email,
    password,
    roles: roles ? roles : ["STUDENT"],
    AccountStatus: AccountStatus ? AccountStatus : "PENDING",
  });
  return user.save();
};
