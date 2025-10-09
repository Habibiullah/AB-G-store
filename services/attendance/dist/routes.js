import { Router } from "express";
import { Attendance } from "./models/Attendance.js";
const r = Router();
r.get("/", async (req, res) => {
    const data = await Attendance.find().lean();
    res.json(data);
});
r.post("/", async (req, res) => {
    const doc = await Attendance.create(req.body);
    res.status(201).json(doc);
});
export default r;
