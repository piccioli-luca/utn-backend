import { Request, Response } from "express";
import { Cat, ICat } from "./Cat";

// Returns all cats from the database.
const getAllCatsRaw = async () => {
    try {
        const cats = await Cat.find();
        return cats;
    } catch (error) {
        const e = error as Error;
        throw new Error(`Error fetching cats: ${e.message}`);
    }
}

// Returns all cats from the database.
const getAllCats = async (req: Request, res: Response) => {
    try {
        const cats = await Cat.find();
        res.json(cats);
    } catch (error) {
        const e = error as Error;
        res.status(500).json({
            success: false,
            error: e.message,
        });
    }
}

// Updates a cat in the database.
const updateCat = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedCatData: Partial<ICat> = req.body;

        const cat = await Cat.findByIdAndUpdate(id, updatedCatData, { new: true });
        if (!cat || cat === null) {
            return res.status(404).json({
                message: "cat not found",
            });
        }
        res.json({
            success: true,
            data: cat,
            message: "Cat updated successfully",
        });
    } catch (error) {
        const e = error as Error;
        return res.status(500).json({
            success: false,
            error: e.message,
        });
    }
}

// Creates a new cat in the database.
const createCat = async (req: Request, res: Response) => {
    try {

        const newCatData: ICat = req.body;
        const newCat = new Cat(newCatData);
        await newCat.save();
        return res.status(201).json(
            {
                success: true,
                data: newCat,
                message: "Cat created successfully",
            }
        );
        
    } catch (error) {
        const e = error as Error;
        return res.status(400).json({
            success: false,
            error: e.message,
        });
    }
}

// Deletes a cat from the database.
const deleteCat = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedCat = await Cat.findByIdAndDelete(id);
        if (!deletedCat || deletedCat === null) {
            return res.status(404).json({
                success: false,
                message: "Cat not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: deletedCat.id,
            message: "Cat deleted successfully",
        });
    } catch (error) {
        const e = error as Error;
        return res.status(400).json({
            success: false,
            error: e.message,
        });
    }
}

// Retrieves a cat by its ID from the database.
const getcatbyID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const cat = await Cat.findById(id);
        if (!cat || cat === null) {
            return res.status(404).json({
                success: false,
                message: "Cat not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: cat,
            message: "Cat retrieved successfully",
        });
    } catch (error) {
        const e = error as Error;
        return res.status(500).json({
            success: false,
            error: e.message,
        });
    }
}

export { getAllCatsRaw, getAllCats, updateCat, createCat, deleteCat, getcatbyID };