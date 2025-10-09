import { Schema, model } from "mongoose";

const PayrollSchema = new Schema(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    month: { type: String, required: true }, // e.g. 2025-10
    base: { type: Number, required: true },
    bonus: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    paidOn: Date
  },
  { timestamps: true }
);

PayrollSchema.index({ employeeId: 1, month: 1 }, { unique: true });

export const Payroll = model("Payroll", PayrollSchema);