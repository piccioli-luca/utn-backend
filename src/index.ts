import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Cat } from './Cat'; // Adjust path if needed

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/db-utn-crud');

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

app.listen(3000, () => {
  console.log('Backend server running at http://localhost:3000');
});
