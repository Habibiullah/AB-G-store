import { Router } from "express";
import { Payroll } from "./models/Payroll.js";
const r = Router();
r.get("/", async (_req, res) => {
    const data = await Payroll.find().lean();
    res.json(data);
});
r.post("/", async (req, res) => {
    const doc = await Payroll.create(req.body);
    res.status(201).json(doc);
});
export default r;
