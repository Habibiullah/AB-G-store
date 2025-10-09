export const env = {
    mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hrms",
    corsOrigin: process.env.CORS_ORIGIN || "*",
    jwtSecret: process.env.JWT_SECRET || "dev",
};
