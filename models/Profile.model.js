import { Schema, model } from "mongoose";

const ProfileSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: [11, "Mobile Number Must be 11 Character "],
    maxlength: [11, "Mobile Number Must be 11 Character "],
  },
  avater: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Profile = model("Profile", ProfileSchema);
