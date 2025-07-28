import { connect } from "mongoose";
import { Cat, ICat } from "./Cat";
import { getAllCatsRaw, getAllCats, updateCat, createCat, deleteCat, getcatbyID } from "./CRUD";
process.loadEnvFile();

// Load environment variables from .env file
const URI_DB = process.env.URI_DB || "";

// Connects to MongoDB and logs the connection status.
const connectMongoDB = async () => {
    try {
    await connect(URI_DB)
    console.log("MongoDB connected");
    } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    }
}

// Main function.
// Connects to MongoDB.
// Currently retrieves all cats and logs them. Insert code here.
const main = async () => {
    await connectMongoDB();

    // Example cat creation.
    /*
    createCat({
        name: "Diana",
        age: 3,
        weight_kg: 4,
        breed: "Fluffy",
        owner: "Luca Piccioli",
        color: "Gray"})
    */

    const cats = await getAllCatsRaw();
    console.log(cats);
}

main();