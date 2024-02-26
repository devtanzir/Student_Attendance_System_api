import { getEnableService, runningService } from "../service/Admin_service.js";
import { addMinutes, isAfter } from "date-fns";
import error from "../utils/error.utils.js";

export const EnableService = async () => {
  const isRunning = await runningService();

  if (isRunning) throw error("already Running", 400);

  return await getEnableService();
};

export const DisableService = async () => {
  const isRunning = await runningService();

  if (!isRunning) throw error("not Running", 400);
  isRunning.status = "COMPLETED";
  return await isRunning.save();
};
export const StatusService = async () => {
  const isRunning = await runningService();

  if (!isRunning) throw error("not Running", 400);
  const started = addMinutes(
    new Date(isRunning.createdAt),
    isRunning.timeLimit
  );
  if (isAfter(new Date(), started)) {
    isRunning.status = "COMPLETED";
    return await isRunning.save();
  }
  return isRunning;
};
