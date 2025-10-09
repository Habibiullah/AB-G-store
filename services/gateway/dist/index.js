import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
import "dotenv/config";
const PORT = Number(process.env.PORT_GATEWAY) || 8080;
const ORIGIN = process.env.CORS_ORIGIN || "*";
const targets = {
    auth: process.env.AUTH_URL || "http://localhost:4001",
    employees: process.env.EMPLOYEES_URL || "http://localhost:4002",
    attendance: process.env.ATTENDANCE_URL || "http://localhost:4003",
    payroll: process.env.PAYROLL_URL || "http://localhost:4004",
};
const app = express();
app.use(cors({ origin: ORIGIN }));
app.use(morgan("dev"));
// Re-stream JSON body if body-parser already consumed it
function restreamBody(proxyReq, req) {
    if (!req.body || !Object.keys(req.body).length)
        return;
    const body = JSON.stringify(req.body);
    proxyReq.setHeader("Content-Type", "application/json");
    proxyReq.setHeader("Content-Length", Buffer.byteLength(body));
    proxyReq.write(body);
}
// Factory for v3 with typed params to avoid implicit-any
function mkProxy(target, stripPrefix) {
    return createProxyMiddleware({
        target,
        changeOrigin: true,
        proxyTimeout: 30_000,
        pathRewrite: (path) => path.replace(stripPrefix, "/"),
        on: {
            proxyReq: (proxyReq, req) => {
                const method = req?.method;
                if (method && /^(POST|PUT|PATCH)$/i.test(method)) {
                    // cast to Express Request so restreamBody can read req.body safely
                    restreamBody(proxyReq, req);
                }
            },
            error: (err, _req, res) => {
                const msg = err instanceof Error ? err.message : String(err);
                try {
                    res.statusCode = 502;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({ ok: false, error: "Bad gateway", detail: msg }));
                }
                catch {
                    /* no-op */
                }
            },
        },
        logger: console,
    }); // keep TS happy across v3 minor type changes
}
// Mount proxies BEFORE any body parsing
app.use("/auth", mkProxy(targets.auth, /^\/auth/));
app.use("/employees", mkProxy(targets.employees, /^\/employees/));
app.use("/attendance", mkProxy(targets.attendance, /^\/attendance/));
app.use("/payroll", mkProxy(targets.payroll, /^\/payroll/));
// Only parse JSON for local routes (after proxies)
app.use(express.json());
app.get("/health", (_req, res) => res.json({ ok: true, service: "gateway" }));
app.get("/", (_req, res) => res.json({ ok: true, hint: "Use /auth, /employees, /attendance, /payroll" }));
app.listen(PORT, () => console.log(`[gateway] listening on :${PORT}`));
