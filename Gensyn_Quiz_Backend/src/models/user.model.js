import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Expert"],
      default: "Beginner",
    },
    totalHighScore: {
      type: Number,
      default: 0,
      index: true,
    },
    totalTimeConsumed: { type: Number, default: 0, index: true },
    scores: {
      Beginner: {
        beginnerHighestScore: {
          type: Number,
          default: 0,
        },
        timeConsumed: {
          type: Number,
          default: 0,
        },
        totalAttempts: {
          type: Number,
          default: 0,
        },
      },
      Intermediate: {
        intermediateHighestScore: {
          type: Number,
          default: 0,
        },
        timeConsumed: {
          type: Number,
          default: 0,
        },
        totalAttempts: {
          type: Number,
          default: 0,
        },
      },
      Expert: {
        expertHighestScore: {
          type: Number,
          default: 0,
        },
        timeConsumed: {
          type: Number,
          default: 0,
        },
        totalAttempts: {
          type: Number,
          default: 0,
        },
      },
    },

    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    userId: {
      type: String,
      unique: true,
      sparse: true,
    },
    avatar_Hash: {
      type: String,
    },
    banner_Hash: {
      type: String,
    },
    global_Name: {
      type: String,
    },
    refresh_Token: {
      type: String,
    },
    isGuest: {
      type: Boolean,
      default: false,
    },
    avatarUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
