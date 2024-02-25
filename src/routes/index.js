import { Router } from "express";
import authRoute from "./auth.route.js";

const router = Router();

router.use("/api/v1/auth", authRoute);

export default router;
