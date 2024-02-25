import { Router } from "express";
import authRoute from "./auth.route.js";
import userRoute from "./User.route.js";
import authenticate from "../middleware/authenticate.middleware.js";

const router = Router();

router.use("/api/v1/auth", authRoute);
router.use("/api/v1/users", authenticate, userRoute);

export default router;
