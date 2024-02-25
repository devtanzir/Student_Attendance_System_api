import { Router } from "express";
import authRoute from "./auth.route.js";
import userRoute from "./User.route.js";
import authenticate from "../middleware/authenticate.middleware.js";
import adminAttendance from "./admin-attendance.route.js";
import studentAttendance from "./student-attendance.route.js";

const router = Router();

router.use("/api/v1/auth", authRoute);
router.use("/api/v1/users", authenticate, userRoute);
router.use("/api/v1/admin/attendance", authenticate, adminAttendance);
router.use("/api/v1/student/attendance", authenticate, studentAttendance);

export default router;
