import { Schema, model } from "mongoose";

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

export { Cat, ICat };