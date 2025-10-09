import { Schema, model } from "mongoose";

const EmployeeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    empCode: { type: String, unique: true, required: true },
    department: String,
    designation: String,
    joinDate: Date,
    salary: Number,
    status: { type: String, enum: ["active", "inactive"], default: "active" }
  },
  { timestamps: true }
);

export const Employee = model("Employee", EmployeeSchema);