import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Cat } from './Cat'; // Adjust path if needed
import dotenv from 'dotenv';
dotenv.config();
const URI_DB: string = process.env.URI_DB || 'mongodb://localhost:27017/mydatabase';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(URI_DB);

// Search route
app.get('/api/search', async (req, res) => {
  const q = req.query.q as string;
  if (!q) return res.json([]);

  try {
    console.log("Incoming search:", req.query.q);
    const cats = await Cat.find({ name: { $regex: q, $options: 'i' } });
    res.json(cats);
    console.log("Results found:", cats);
    const allCats = await Cat.find({});
    console.log("All cats:", allCats);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});

