import mongoose from "mongoose";

let isDatabaseConnected: number = -1;

export const databaseConnection = async (): Promise<void> => {
    try {
        if (isDatabaseConnected === 1) {
            console.log("database is already connected");
            return;
        }
        const res = await mongoose.connect(process.env.MONGODB_URI || "");
        isDatabaseConnected = res.connections[0].readyState;
    } catch (err: unknown) {
        console.log(err);
        console.log("Database connection failed");
    }
}