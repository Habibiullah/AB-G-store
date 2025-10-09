import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import { connectMongo } from "@hrms/shared/src/mongo.js";
import { env } from "@hrms/shared/src/env.js";
import routes from "./routes.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: env.corsOrigin }));
app.use(morgan("dev"));
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/", routes);

const port = Number(process.env.PORT_EMPLOYEES) || 4002;
(async () => {
  await connectMongo(env.mongoUri);
  app.listen(port, () => console.log(`[employees] listening on :${port}`));
})();