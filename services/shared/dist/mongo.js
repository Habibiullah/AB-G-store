import mongoose from "mongoose";
export async function connectMongo(uri) {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri);
    mongoose.connection.on("connected", () => console.log("[mongo] connected"));
    mongoose.connection.on("error", (e) => console.error("[mongo] error", e));
    return mongoose;
}
