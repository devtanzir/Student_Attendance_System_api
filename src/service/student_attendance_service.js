import { runningService } from "../service/Admin_service.js";
import {
  getStudentAttendance,
  studentFindByIdService,
  studentRegisterCheck,
} from "../service/student_service.js";
import error from "../utils/error.utils.js";
import { addMinutes, isAfter } from "date-fns";

export const GiveAttendance = async ({ attendanceId, userId }) => {
  const attendance = await studentFindByIdService(attendanceId);
  if (!attendance) throw error("Invalid Attendance", 400);
  if (attendance.status === "COMPLETED") {
    throw error("Attendance Already Completed", 400);
  }
  let stdAttendance = await studentRegisterCheck({ attendanceId, userId });
  if (stdAttendance) throw error("already Register", 400);

  stdAttendance = await getStudentAttendance({ attendanceId, userId });
  return await stdAttendance.save();
};

export const getStatusService = async () => {
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
