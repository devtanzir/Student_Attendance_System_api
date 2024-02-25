import { Schema, model } from "mongoose";

const studentAttendanceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    adminAttendance: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "adminAttendance",
    },
  },
  { timestamps: true }
);

export const studentAttendance = model(
  "studentAttendance",
  studentAttendanceSchema
);
