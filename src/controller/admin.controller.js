import { getEnableService, runningService } from "../service/Admin_service.js";
import error from "../utils/error.utils.js";

export const getEnable = async (req, res, next) => {
  try {
    const isRunning = await runningService();

    if (isRunning) throw error("already Running", 400);

    const attendance = await getEnableService();

    return res.status(201).json(attendance);
  } catch (e) {
    next(e);
  }
};
export const getDisable = async (req, res, next) => {
  try {
    const isRunning = await runningService();

    if (!isRunning) throw error("not Running", 400);
    isRunning.status = "COMPLETED";
    await isRunning.save();
    return res.status(200).json(isRunning);
  } catch (e) {
    next(e);
  }
};
export const getStatus = async (req, res, next) => {
  try {
    const isRunning = await runningService();

    if (!isRunning) throw error("not Running", 400);
    return res.status(200).json(isRunning);
  } catch (e) {
    next(e);
  }
};
