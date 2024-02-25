import Jwt from "jsonwebtoken";
import { findUserByProperty } from "../service/User_Service.js";

export default async function authenticate(req, res, next) {
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Invalid Token" });
    return;
  }

  token = token?.split(" ")[1];

  const decoded = Jwt.verify(token, "my-secret-key");

  const user = await findUserByProperty("_id", decoded._id);

  if (!user) res.status(401).json({ message: "Invalid Token" });

  req.user = user;
  next();
}
