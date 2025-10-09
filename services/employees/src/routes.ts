import { Router } from "express";
import { Employee } from "./models/Employee.js";

const r = Router();

r.get("/", async (_req, res) => {
  const data = await Employee.find().lean();
  res.json(data);
});

r.post("/", async (req, res) => {
  const doc = await Employee.create(req.body);
  res.status(201).json(doc);
});

r.put("/:id", async (req, res) => {
  const doc = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(doc);
});

r.delete("/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default r;