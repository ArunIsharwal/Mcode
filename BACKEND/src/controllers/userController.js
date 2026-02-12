import User from "../models/User.js";

const startOfDayString = (date = new Date()) =>
  date.toISOString().slice(0, 10); // YYYY-MM-DD

export const createUser = async (req, res) => {
  try {
    const { username, age, height, weight, gender } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const existing = await User.findOne({ username: username.trim() });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Username already taken, please choose another" });
    }

    const user = new User({
      username: username.trim(),
      age,
      height,
      weight,
      gender,
      points: 0,
      currentStreak: 0,
      lastLogDate: null,
    });

    // silently compute BMI if possible
    user.updateBmi();

    await user.save();

    const today = startOfDayString();

    res.status(201).json({
      username: user.username,
      age: user.age,
      height: user.height,
      weight: user.weight,
      gender: user.gender,
      points: user.points,
      currentStreak: user.currentStreak,
      lastLogDate: user.lastLogDate,
      today,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const { age, height, weight, gender } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.age = age ?? user.age;
    user.height = height ?? user.height;
    user.weight = weight ?? user.weight;
    user.gender = gender ?? user.gender;
    user.updateBmi();

    await user.save();

    res.json({
      username: user.username,
      age: user.age,
      height: user.height,
      weight: user.weight,
      gender: user.gender,
      points: user.points,
      currentStreak: user.currentStreak,
      lastLogDate: user.lastLogDate,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = startOfDayString();
    const isOnStreakToday = user.lastLogDate === today;

    res.json({
      username: user.username,
      age: user.age,
      height: user.height,
      weight: user.weight,
      gender: user.gender,
      points: user.points,
      currentStreak: user.currentStreak,
      lastLogDate: user.lastLogDate,
      isOnStreakToday,
      today,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

