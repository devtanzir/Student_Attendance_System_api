import { adminAttendance } from "../models/Admin-Attendance.model.js";
import { studentAttendance } from "../models/student-Attendance.model.js";

export const studentFindByIdService = (id) => {
  return adminAttendance.findById(id);
};

export const studentRegisterCheck = async ({ attendanceId, userId }) => {
  return await studentAttendance.findOne({
    adminAttendance: attendanceId,
    user: userId,
  });
};

export const getStudentAttendance = async ({ attendanceId, userId }) => {
  return new studentAttendance({
    user: userId,
    adminAttendance: attendanceId,
  });
};
