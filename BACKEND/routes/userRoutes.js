
import express from 'express';
import User from '../models/User.js';
import SugarEvent from '../models/SugarEvent.js';

const router = express.Router();

// Get Leaderboard (Daily/Monthly)
router.get('/leaderboard', async (req, res) => {
    try {
        const { timeframe } = req.query;
        const now = new Date();
        let startDate = new Date();

        if (timeframe === 'monthly') {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        } else {
           
            startDate.setHours(0, 0, 0, 0);
        }

        const leaderboard = await SugarEvent.aggregate([
            {
                $match: {
                    timestamp: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: '$userId',
                    totalXP: { $sum: '$pointsEarned' }
                }
            },
            {
                $sort: { totalXP: -1 }
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    _id: 1,
                    username: '$user.username',
                    name: '$user.name',
                    avatar: '$user.avatar',
                    xp: '$totalXP'
                }
            }
        ]);

        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new user (Register)
router.post('/', async (req, res) => {
    try {
        const { anonymousID, username, age, bmi, name, gender, height, weight, dailyLimit, avatar, activity, onboarded } = req.body;

       
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const user = new User({
            anonymousID, username, age, bmi, name, gender, height, weight, dailyLimit, avatar, activity, onboarded
        });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/:anonymousID', async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findOneAndUpdate(
            { anonymousID: req.params.anonymousID },
            { $set: updates },
            { new: true } 
        );
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get user by AnonymousID
router.get('/:anonymousID', async (req, res) => {
    try {
        const user = await User.findOne({ anonymousID: req.params.anonymousID });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;