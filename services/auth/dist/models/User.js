import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["admin", "hr", "employee"], default: "employee" },
    passwordHash: { type: String, required: true }
}, { timestamps: true });
export const User = model("User", UserSchema);
