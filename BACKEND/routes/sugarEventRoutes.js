
import express from 'express';
import SugarEvent from '../models/SugarEvent.js';

const router = express.Router();

// Log a new sugar event
router.post('/', async (req, res) => {
    try {
        const { userId, foodName, sugarGrams, method, calories, category, timestamp } = req.body;
        const event = new SugarEvent({
            userId,
            itemName: foodName, // Map frontend foodName to schema itemName if needed, or update schema
            sugarGrams,
            method,
            calories,
            category,
            timestamp
        });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get events for a user (for Heatmap)
router.get('/:userId', async (req, res) => {
    try {
        const events = await SugarEvent.find({ userId: req.params.userId }).sort({ timestamp: -1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
