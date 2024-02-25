import { Router } from "express";
import { getAttendance, getStatus } from "../controller/student.controller.js";

const router = Router();

router.get("/:id", getAttendance);
router.get("/status", getStatus);

export default router;
