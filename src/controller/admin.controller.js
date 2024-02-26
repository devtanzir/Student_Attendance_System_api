import { addMinutes, isAfter } from "date-fns";
import { getEnableService, runningService } from "../service/Admin_service.js";
import error from "../utils/error.utils.js";

export const getEnable = async (_req, res, next) => {
  try {
    const isRunning = await runningService();

    if (isRunning) throw error("already Running", 400);

    const attendance = await getEnableService();

    return res.status(201).json({ message: "Success", attendance });
  } catch (e) {
    next(e);
  }
};
export const getDisable = async (_req, res, next) => {
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
export const getStatus = async (_req, res, next) => {
  try {
    const isRunning = await runningService();

    if (!isRunning) throw error("not Running", 400);
    const started = addMinutes(
      new Date(isRunning.createdAt),
      isRunning.timeLimit
    );
    if (isAfter(new Date(), started)) {
      isRunning.status = "COMPLETED";
      await isRunning.save();
    }
    return res.status(200).json(isRunning);
  } catch (e) {
    next(e);
  }
};
