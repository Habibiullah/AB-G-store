import { Schema, model } from "mongoose";

const AttendanceSchema = new Schema(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["present", "absent", "leave"], required: true },
    checkIn: Date,
    checkOut: Date
  },
  { timestamps: true }
);

AttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

export const Attendance = model("Attendance", AttendanceSchema);