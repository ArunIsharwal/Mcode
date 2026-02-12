import mongoose from "mongoose";

const sugarEventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // General type key, e.g. "chai", "cold_drink", "custom"
    type: {
      type: String,
      required: true,
    },
    // Optional human-friendly label, e.g. "Gulab Jamun"
    label: {
      type: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    // Insight and suggested action generated on backend
    insight: {
      type: String,
    },
    suggestedAction: {
      type: String,
    },
    pointsAwarded: {
      type: Number,
      default: 0,
    },
    // Action completion tracking for +7 points rule
    actionCompleted: {
      type: Boolean,
      default: false,
    },
    actionCompletedAt: {
      type: Date,
    },
    actionCompletionPoints: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const SugarEvent = mongoose.model("SugarEvent", sugarEventSchema);

export default SugarEvent;

