import React from "react";
import { TrophyIcon, LockIcon } from "./Icons.jsx";

export default function WelcomeScreen({ onNavigate, unlockedLevels }) {
  const isIntermediateLocked = !unlockedLevels.includes("intermediate");
  const isExpertLocked = !unlockedLevels.includes("expert");

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 text-center animate-fade-in-up">
      <TrophyIcon className="h-16 w-16 sm:h-20 sm:w-20 text-amber-300 mx-auto" />
      <h1 className="text-3xl sm:text-4xl font-bold text-white mt-4">
        Cosmic Quiz
      </h1>
      <p className="text-base sm:text-lg text-gray-300 mt-2 mb-6">
        Test your knowledge and climb the leaderboard!
      </p>

      <div className="border-t border-white/10 my-8"></div>

      <h2 className="text-2xl font-semibold text-white mb-4">
        Select Your Challenge
      </h2>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => onNavigate("quiz", "beginner")}
          className="w-full bg-green-600/80 text-white font-bold text-lg py-3 rounded-xl hover:bg-green-700/80 transition-all transform hover:scale-105"
        >
          "I'm just a beginner"
        </button>

        <button
          onClick={() => onNavigate("quiz", "intermediate")}
          disabled={isIntermediateLocked}
          className="w-full flex justify-center items-center bg-blue-600/80 text-white font-bold text-lg py-3 rounded-xl transition-all transform enabled:hover:bg-blue-700/80 enabled:hover:scale-105 disabled:bg-gray-500/50 disabled:cursor-not-allowed"
        >
          {isIntermediateLocked && <LockIcon />}
          "I know some things"
        </button>

        <button
          onClick={() => onNavigate("quiz", "expert")}
          disabled={isExpertLocked}
          className="w-full flex justify-center items-center bg-red-600/80 text-white font-bold text-lg py-3 rounded-xl transition-all transform enabled:hover:bg-red-700/80 enabled:hover:scale-105 disabled:bg-gray-500/50 disabled:cursor-not-allowed"
        >
          {isExpertLocked && <LockIcon />}
          "I'm an expert"
        </button>
      </div>

      <div className="border-t border-white/10 my-8"></div>

      <button
        onClick={() => onNavigate("leaderboard")}
        className="w-full bg-white/10 text-white font-bold text-lg py-3 rounded-xl hover:bg-white/20 transition-all transform hover:scale-105"
      >
        View Leaderboard
      </button>
    </div>
  );
}
