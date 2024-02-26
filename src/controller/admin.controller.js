import {
  DisableService,
  EnableService,
  StatusService,
} from "../service/admin-attendance_service.js";

export const getEnable = async (_req, res, next) => {
  try {
    const attendance = await EnableService();
    return res.status(201).json({ message: "Success", attendance });
  } catch (e) {
    next(e);
  }
};
export const getDisable = async (_req, res, next) => {
  try {
    const disable = await DisableService();
    return res.status(200).json(disable);
  } catch (e) {
    next(e);
  }
};
export const getStatus = async (_req, res, next) => {
  try {
    const status = await StatusService();
    return res.status(200).json(status);
  } catch (e) {
    next(e);
  }
};
