import { connect } from "mongoose";
process.loadEnvFile();

const URI_DB = process.env.URI_DB || "";

const connectMongoDB = async () => {
    try {
    await connect(URI_DB)
    console.log("MongoDB connected");
    } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    }
}

connectMongoDB();