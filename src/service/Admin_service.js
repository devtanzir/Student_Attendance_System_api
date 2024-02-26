import { adminAttendance } from "../models/Admin-Attendance.model.js";

export const getEnableService = () => {
  const attendance = new adminAttendance({});

  return attendance.save();
};

export const runningService = () => {
  return adminAttendance.findOne({ status: "RUNNING" });
};
