import {
  GiveAttendance,
  getStatusService,
} from "../service/student_attendance_service.js";

export const getAttendance = async (req, res, next) => {
  const { attendanceId } = req.params;
  const { user } = req;
  const userId = user._id;

  try {
    const attendance = await GiveAttendance({ attendanceId, userId });
    return res.status(201).json(attendance);
  } catch (e) {
    next(e);
  }
};
export const getStatus = async (_req, res, next) => {
  try {
    const status = await getStatusService();
    return res.status(200).json(status);
  } catch (e) {
    next(e);
  }
};
