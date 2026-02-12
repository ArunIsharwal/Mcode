import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    age: {
      type: Number,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say"],
    },
    // Silent BMI storage (never exposed directly to client)
    bmi: {
      type: Number,
    },
    points: {
      type: Number,
      default: 0,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    lastLogDate: {
      // Stored as YYYY-MM-DD string for easier streak math
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.updateBmi = function () {
  if (!this.height || !this.weight) return;
  // Height is expected in cm, convert to meters
  const heightMeters = this.height / 100;
  if (!heightMeters) return;
  const bmi = this.weight / (heightMeters * heightMeters);
  this.bmi = Math.round(bmi * 10) / 10;
};

const User = mongoose.model("User", userSchema);

export default User;

