import User from "../models/User.js";
import SugarEvent from "../models/SugarEvent.js";

const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

const startOfDayString = (date = new Date()) =>
  date.toISOString().slice(0, 10); // YYYY-MM-DD

export const getTodayStats = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { start, end } = getTodayRange();

    const events = await SugarEvent.find({
      user: user._id,
      timestamp: { $gte: start, $lte: end },
    }).sort({ timestamp: -1 });

    const today = startOfDayString();
    const isOnStreakToday = user.lastLogDate === today;

    const lastSuggestion = events[0]
      ? {
          eventId: events[0]._id,
          insight: events[0].insight,
          suggestedAction: events[0].suggestedAction,
          timestamp: events[0].timestamp,
          actionCompleted: events[0].actionCompleted,
          actionCompletedAt: events[0].actionCompletedAt,
        }
      : null;

    res.json({
      username: user.username,
      todayEvents: events.map((e) => ({
        id: e._id,
        type: e.type,
        timestamp: e.timestamp,
        insight: e.insight,
        suggestedAction: e.suggestedAction,
        pointsAwarded: e.pointsAwarded,
        actionCompleted: e.actionCompleted,
        actionCompletedAt: e.actionCompletedAt,
        actionCompletionPoints: e.actionCompletionPoints,
      })),
      todayCount: events.length,
      points: user.points,
      currentStreak: user.currentStreak,
      isOnStreakToday,
      lastLogDate: user.lastLogDate,
      lastSuggestion,
    });
  } catch (error) {
    console.error("Error fetching today stats:", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

