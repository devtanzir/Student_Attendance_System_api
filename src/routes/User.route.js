import { Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  patchUserById,
  postUser,
} from "../controller/user.controller.js";

const router = Router();

router.get("/:userId", getUserById);
router.patch("/:userId", patchUserById);
router.delete("/:userId", deleteUserById);
router.post("/", postUser);
router.get("/", getAllUsers);

export default router;
