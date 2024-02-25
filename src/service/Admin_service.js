import { adminAttendance } from "../models/Admin-Attendance.model.js";

export const runningService = () => {
  return adminAttendance.findOne({ status: "RUNNING" });
};

export const getEnableService = () => {
  const attendance = new adminAttendance();

  return attendance.save();
};
