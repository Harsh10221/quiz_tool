import React from "react";
import { Link, useNavigate } from "react-router-dom";

// SVG icon for the lock
const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 inline-block mr-2 align-text-bottom"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2 2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
      clipRule="evenodd"
    />
  </svg>
);

// The card component now accepts an `isLocked` prop to change its appearance and behavior.
const DifficultyCard = ({ title, description, onSelect, color, isLocked }) => {
  return (
    <div
      className={`
      bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 transition-all duration-300
      ${
        isLocked
          ? "cursor-not-allowed"
          : "hover:border-white/20 hover:bg-white/10 transform hover:scale-[1.02]"
      }
    `}
    >
      <h3
        className={`text-xl font-bold mb-2 ${
          isLocked ? "text-gray-500" : color
        }`}
      >
        {isLocked && <LockIcon />}
        {title}
      </h3>
      <p className="text-gray-400 mb-6 text-sm leading-relaxed">
        {description}
      </p>
      {/* <Link to={"/quiz"} state={} > */}
        <button
          onClick={onSelect}
          disabled={isLocked}
          className={`
          w-full text-white font-bold py-3 px-6 rounded-lg border transition-all duration-300
          ${
            isLocked
              ? "bg-gray-800/20 text-gray-500 border-white/10 cursor-not-allowed"
              : "bg-white/10 border-white/20 hover:bg-white/20"
          }
        `}
        >
          {isLocked ? "Locked" : "Select Level"}
        </button>
      {/* </Link> */}
    </div>
  );
};

// The main component now accepts `highestCompletedLevel` and calculates which levels are locked.
export default function SelectQuizLvl({
  onDifficultySelect,
  projectName = "Gensyn",
  highestCompletedLevel,
}) {
  const navigate = useNavigate()
  const levels = ["Beginner", "Intermediate", "Expert"];
  const userHigestscore = JSON.parse(localStorage?.getItem('userData'))?.totalHighScore
  // console.log("higestscore",higeshscore)
  // Find the index of the highest completed level. Will be -1 if "None" is passed.
  const highestCompletedIndex = levels.indexOf(highestCompletedLevel);

  const difficulties = [
    {
      level: "Beginner",
      description: `Perfect for newcomers. This level covers the fundamental concepts and basic syntax of ${projectName} to get you started.`,
      color: "text-green-400",
    },
    {
      level: "Intermediate",
      description: `Challenge yourself with more complex scenarios and advanced topics. Assumes a solid grasp of the ${projectName} basics.`,
      color: "text-yellow-400",
    },
    {
      level: "Expert",
      description: `For seasoned developers. These questions will test the depths of your knowledge on intricate and nuanced ${projectName} topics.`,
      color: "text-red-400",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans text-center">
      <div className="mb-5 flex items-center justify-between w-full text-[#c2bebe] bg-white/10 font-figtree   backdrop-blur-lg  py-2 px-4 rounded-2xl shadow-2xl shadow-purple-500/10 border border-white/20 text-center  ">
        <svg
        onClick={()=> navigate('/')}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>

        {/* <div className="text-[#c2bebe] bg-white/10 font-figtree   backdrop-blur-lg  py-2 px-4 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/20 text-center  "> */}
        <div>Higest score : {userHigestscore|| 0}</div>
      </div>

      <div className="w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Test Your <span className="text-purple-400">{projectName}</span>{" "}
          Knowledge
        </h1>
        <p className="text-gray-400 mb-10">
          Select a difficulty level to begin the quiz.
        </p>

        <div className="flex flex-col gap-6">
          {difficulties.map((diff, index) => {
            // A level is locked if its index is greater than the next available level.
            const isLocked = index > highestCompletedIndex;

            return (
              <DifficultyCard
                key={diff.level}
                title={diff.level}
                description={diff.description}
                color={diff.color}
                isLocked={isLocked}
                onSelect={() => !isLocked && onDifficultySelect(diff.level)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
