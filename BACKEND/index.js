
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import sugarEventRoutes from './routes/sugarEventRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/beat-the-sugar-spike')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/sugar-events', sugarEventRoutes);

app.get('/', (req, res) => {
  res.send('Beat the Sugar Spike API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
