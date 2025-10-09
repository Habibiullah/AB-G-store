import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" })); // allow everyone
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", createProxyMiddleware({ target: "http://localhost:4001", changeOrigin: true }));
app.use("/employees", createProxyMiddleware({ target: "http://localhost:4002", changeOrigin: true }));
app.use("/attendance", createProxyMiddleware({ target: "http://localhost:4003", changeOrigin: true }));
app.use("/payroll", createProxyMiddleware({ target: "http://localhost:4004", changeOrigin: true }));

const port = Number(process.env.PORT_GATEWAY) || 8080;
app.listen(port, () => console.log(`[gateway] listening on :${port}`));