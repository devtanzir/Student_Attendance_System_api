import { Router } from "express";
import { getAttendance, getStatus } from "../controller/student.controller.js";

const router = Router();

router.get("/status", getStatus);
router.get("/:attendanceId", getAttendance);

export default router;
