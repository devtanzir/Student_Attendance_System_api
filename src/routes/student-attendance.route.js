import { Router } from "express";
import { getAttendance, getStatus } from "../controller/student.controller.js";

const router = Router();

router.get("/status", getStatus);
router.get("/:userId", getAttendance);

export default router;
