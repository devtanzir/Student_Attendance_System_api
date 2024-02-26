import { adminAttendance } from "../models/Admin-Attendance.model.js";
import { studentAttendance } from "../models/student-Attendance.model.js";

export const studentFindByIdService = (id) => {
  return adminAttendance.findById(id);
};

// export const studentAttendanceFindOne = ({ id, userId }) => {
//   return studentAttendance.findOne({
//     adminAttendance: id,
//     user: userId,
//   });
// };

// export const getAttendanceService = ({ id, userId }) => {
//   const stdAttendance = new studentAttendance({
//     adminAttendance: id,
//     user: userId,
//   });
//   return stdAttendance.save();
// };
