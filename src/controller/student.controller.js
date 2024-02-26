import { studentAttendance } from "../models/student-Attendance.model.js";
import { runningService } from "../service/Admin_service.js";
import { studentFindByIdService } from "../service/student_service.js";
import error from "../utils/error.utils.js";
import { addMinutes, isAfter } from "date-fns";
export const getAttendance = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const attendance = await studentFindByIdService(userId);
    if (!attendance) throw error("Invalid Attendance", 400);
    if (attendance.status === "COMPLETED") {
      throw error("Attendance Already Completed", 400);
    }

    let stdAttendance = await studentAttendance.findOne({
      adminAttendance: userId,
      user: req.user._id,
    });
    if (stdAttendance) throw error("already Register", 400);

    stdAttendance = new studentAttendance({
      user: req.user._id,
      adminAttendance: userId,
    });

    await stdAttendance.save();

    return res.status(201).json(stdAttendance);
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
