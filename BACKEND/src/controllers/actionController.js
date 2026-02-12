import User from "../models/User.js";
import SugarEvent from "../models/SugarEvent.js";

const isWithin30Minutes = (from, to) => {
  const diffMs = to.getTime() - from.getTime();
  const minutes = diffMs / (1000 * 60);
  return minutes <= 30 && minutes >= 0;
};

export const completeAction = async (req, res) => {
  try {
    const { username, eventId } = req.body;

    if (!username || !eventId) {
      return res
        .status(400)
        .json({ message: "Username and eventId are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const event = await SugarEvent.findOne({
      _id: eventId,
      user: user._id,
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.actionCompleted) {
      return res.status(400).json({ message: "Action already completed" });
    }

    const now = new Date();
    const loggedAt = event.timestamp;

    if (!isWithin30Minutes(loggedAt, now)) {
      return res.status(400).json({
        message:
          "Action not counted because it was completed more than 30 minutes after the suggestion.",
      });
    }

    const completionPoints = 7;
    event.actionCompleted = true;
    event.actionCompletedAt = now;
    event.actionCompletionPoints = completionPoints;
    await event.save();

    user.points += completionPoints;
    await user.save();

    res.json({
      message: "Great job completing the action!",
      pointsAdded: completionPoints,
      totalPoints: user.points,
      eventId: event._id,
    });
  } catch (error) {
    console.error("Error completing action:", error);
    res.status(500).json({ message: "Failed to complete action" });
  }
};

