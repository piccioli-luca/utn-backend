import { connect, version, Schema, model } from "mongoose";
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

// Schema for the Cat model.
// Defines the structure of the Cat documents in the database.
const catSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: false, default: null },
    weight_kg: { type: Number, required: false, default: null },
    breed: { type: String, required: false, default: null },
    owner: { type: String, required: false, default: null },
    color: { type: String, required: true },
}, {
    versionKey: false,
})

// Model for the Cat schema.
const Cat = model("Cat", catSchema);

// Interface for the Cat model.
interface ICat {
    name: string;
    color: string;
    age: number | null;
    breed: string | null;
    owner: string | null;
    weight_kg: number | null;
}

// Returns all cats from the database.
const getAllCats = async () => {
    try {
        const cats = await Cat.find();
        return {
            success: true,
            data: cats,
            message: "Cats retrieved successfully",
        };
    } catch (error) {
        const e = error as Error;
        return {
            success: false,
            error: e.message,
        }
    }
}

// Updates a cat in the database.
const updateCat = async (id: string, updatedCatData: Partial<ICat>) => {
    try {
        const cat = await Cat.findByIdAndUpdate(id, updatedCatData, { new: true });
        if (!cat || cat === null) {
            return {
                success: false,
                message: "Cat not found",
            }
        }
        return {
            success: true,
            data: cat,
            message: "Cat updated successfully",
        };
    } catch (error) {
        const e = error as Error;
        return {
            success: false,
            error: e.message,
        }
    }
}

// Creates a new cat in the database.
const createCat = async (newCatData: ICat) => {
    try {

        const { name, age, breed, color, owner, weight_kg } = newCatData;
        const newCat = new Cat({name, age, breed, color, owner, weight_kg});
        await newCat.save();
        return {
            success: true,
            data: newCat,
            message: "Cat created successfully",
        };
    } catch (error) {
        const e = error as Error;
        return {
            success: false,
            error: e.message,
        }
    }
}

// Deletes a cat from the database.
const deleteCat = async (id: string) => {
    try {
        const deletedCat = await Cat.findByIdAndDelete(id);
        if (!deletedCat || deletedCat === null) {
            return {
                success: false,
                message: "Cat not found",
            }
        }
        return {
            success: true,
            data: deletedCat.id,
            message: "Cat deleted successfully",
        };
    } catch (error) {
        const e = error as Error;
        return {
            success: false,
            error: e.message,
        }
    }
}

// Retrieves a cat by its ID from the database.
const getcatbyID = async (id: string) => {
    try {
        const cat = await Cat.findById(id);
        if (!cat || cat === null) {
            return {
                success: false,
                message: "Cat not found",
            }
        }
        return {
            success: true,
            data: cat,
            message: "Cat retrieved successfully",
        };
    } catch (error) {
        const e = error as Error;
        return {
            success: false,
            error: e.message,
        }
    }
}

// Main function.
// Connects to MongoDB.
// Currently retrieves all cats and logs them. Insert code here.
const main = async () => {
    await connectMongoDB();
    const cats = await getAllCats();
    console.log(cats);
}

main();