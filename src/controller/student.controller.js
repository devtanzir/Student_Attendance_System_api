import { runningService } from "../service/Admin_service.js";
import {
  getAttendanceService,
  studentAttendanceFindOne,
  studentFindByIdService,
} from "../service/student_service.js";
import error from "../utils/error.utils.js";

export const getAttendance = async (req, res, next) => {
  const { userId } = req.params;
  const stdId = req.user._id;

  try {
    const attendance = await studentFindByIdService(userId);
    if (!attendance) throw error("attendance not running", 400);
    if (attendance.status === "COMPLETED") {
      throw error("attendance not running", 400);
    }

    let stdAttendance = await studentAttendanceFindOne({ userId, stdId });
    if (stdAttendance) throw error("already Register", 400);

    stdAttendance = await getAttendanceService({ userId, stdId });

    return res.status(200).json(stdAttendance);
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
