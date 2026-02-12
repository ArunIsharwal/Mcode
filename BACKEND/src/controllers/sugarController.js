import User from "../models/User.js";
import SugarEvent from "../models/SugarEvent.js";

const startOfDayString = (date = new Date()) =>
  date.toISOString().slice(0, 10); // YYYY-MM-DD

const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

const buildInsightAndAction = async (user, type) => {
  const now = new Date();
  const hour = now.getHours();
  const { start, end } = getTodayRange();
  const todayCount = await SugarEvent.countDocuments({
    user: user._id,
    timestamp: { $gte: start, $lte: end },
  });

  let insight = "";
  let action = "";

  if (hour >= 21) {
    insight =
      "You had sugar late in the evening. On days like this, sugar can make it harder to fall asleep and stay rested.";
    action =
      "Take a light 10-minute walk or do some gentle stretching, then switch to water or herbal tea.";
  } else if (todayCount >= 3) {
    insight =
      "You’ve already had multiple sugary items today. This can lead to energy crashes and cravings later.";
    action =
      "Pause for a 10-minute walk and drink a glass of water to reset your energy.";
  } else if (todayCount >= 1) {
    insight =
      "You’re having more than one sugary choice today. That can quickly add up and affect your focus and energy.";
    action =
      "Try balancing this with a protein-rich snack like curd, nuts, or paneer later today.";
  } else {
    insight =
      "This sugary choice gives a quick energy boost, but it may also cause a dip in mood and focus later.";
    action =
      "Drink a glass of water now and plan a short 10-minute walk in the next hour.";
  }

  // Tiny variation based on type for a more “personal” feel
  if (type === "cold_drink") {
    insight = insight.replace(
      "This sugary choice",
      "This cold drink"
    );
  } else if (type === "chai") {
    insight = insight.replace(
      "This sugary choice",
      "This chai break"
    );
  }

  return { insight, action, todayCount };
};

const calculateBasePoints = (timestamp) => {
  const hour = timestamp.getHours();
  // Core rule: +3 points for logging before 6 pm, else +1
  const base = hour < 18 ? 3 : 1;

  // Variable reward: small surprise bonus some of the time
  const bonus = Math.random() < 0.3 ? 2 : 0;

  return { base, bonus, total: base + bonus };
};

const updateStreak = (user, eventDateString) => {
  const previous = user.lastLogDate;

  if (!previous) {
    user.currentStreak = 1;
    user.lastLogDate = eventDateString;
    return;
  }

  if (previous === eventDateString) {
    // Already logged today; streak doesn’t change
    return;
  }

  const prevDate = new Date(previous);
  const currDate = new Date(eventDateString);
  const diffMs = currDate.getTime() - prevDate.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    user.currentStreak += 1;
  } else if (diffDays > 1) {
    user.currentStreak = 1;
  }

  user.lastLogDate = eventDateString;
};

export const logSugarEvent = async (req, res) => {
  try {
    const { username, type } = req.body;

    if (!username || !type) {
      return res
        .status(400)
        .json({ message: "Username and type are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const now = new Date();
    const eventDateStr = startOfDayString(now);

    const { insight, action, todayCount } = await buildInsightAndAction(
      user,
      type
    );

    const { base, bonus, total } = calculateBasePoints(now);

    const sugarEvent = await SugarEvent.create({
      user: user._id,
      type,
      timestamp: now,
      insight,
      suggestedAction: action,
      pointsAwarded: total,
    });

    user.points += total;
    updateStreak(user, eventDateStr);
    await user.save();

    const streakMilestones = [1, 3, 7, 30];
    const reachedMilestone = streakMilestones.includes(user.currentStreak);

    res.status(201).json({
      eventId: sugarEvent._id,
      type: sugarEvent.type,
      timestamp: sugarEvent.timestamp,
      insight: sugarEvent.insight,
      suggestedAction: sugarEvent.suggestedAction,
      pointsAdded: total,
      basePoints: base,
      bonusPoints: bonus,
      totalPoints: user.points,
      currentStreak: user.currentStreak,
      streakMilestone: reachedMilestone ? user.currentStreak : null,
      todayLogCount: todayCount,
    });
  } catch (error) {
    console.error("Error logging sugar event:", error);
    res.status(500).json({ message: "Failed to log sugar event" });
  }
};

