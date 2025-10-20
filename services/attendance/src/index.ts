import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import { connectMongo, env } from "@hrms/shared";
import routes from "./routes.js";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(morgan("dev"));
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/", routes);

const port = Number(process.env.PORT_ATTENDANCE) || 4003;
(async () => {
  await connectMongo(env.mongoUri);
  app.listen(port, () => console.log(`[attendance] listening on :${port}`));
})();