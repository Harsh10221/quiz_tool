import mongoose, { model } from "mongoose";

const leaderboardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      // unique: true,
    },
    discord_Id :{

      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
    },
    totalScore: {
      type: Number,
      default: 0,
      // index: true,
    },
    totalTimeConsumed: {
      type: Number,
      default: 0,
      // index: true,
    },
    avatar_hash: {
      type: String,
      required: true,

    },
  },

  { timestamps: true }
);

leaderboardSchema.index({ totalScore: -1, totalTimeConsumed: 1 });


const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

export default Leaderboard;
