import React from "react";

// --- SVG Icons (TrophyIcon and CrownIcon remain the same) ---
const TrophyIcon = () => (
  <svg
    className="w-8 h-8 mr-2"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <defs>
      <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#c084fc" }} />
        <stop offset="100%" style={{ stopColor: "#ec4899" }} />
      </linearGradient>
    </defs>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" stroke="url(#iconGradient)" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" stroke="url(#iconGradient)" />
    <path d="M4 22h16" stroke="url(#iconGradient)" />
    <path
      d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.87 18.75 7 20.24 7 22"
      stroke="url(#iconGradient)"
    />
    <path
      d="M14 14.66V17c0 .55.47.98.97 1.21C16.13 18.75 17 20.24 17 22"
      stroke="url(#iconGradient)"
    />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" stroke="url(#iconGradient)" />
  </svg>
);

const CrownIcon = () => (
  <svg
    className="w-8 h-8 text-yellow-400 absolute -top-9"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
  </svg>
);

// --- Particle Background Component (Remains the same) ---
const ParticleBackground = () => (
  <>
    <style>{`@keyframes move-stars{from{background-position:0 0}to{background-position:-10000px 5000px}}.stars{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;display:block;background:transparent}.stars-1{background-image:radial-gradient(1px 1px at 20px 30px,#eee,rgba(0,0,0,0)),radial-gradient(1px 1px at 40px 70px,#fff,rgba(0,0,0,0)),radial-gradient(1px 1px at 50px 160px,#ddd,rgba(0,0,0,0)),radial-gradient(1px 1px at 90px 40px,#fff,rgba(0,0,0,0)),radial-gradient(2px 2px at 130px 80px,#fff,rgba(0,0,0,0)),radial-gradient(2px 2px at 160px 120px,#ddd,rgba(0,0,0,0));background-repeat:repeat;background-size:200px 200px;animation:move-stars 200s linear infinite}.stars-2{background-image:radial-gradient(1px 1px at 10px 50px,#eee,rgba(0,0,0,0)),radial-gradient(1px 1px at 60px 90px,#fff,rgba(0,0,0,0)),radial-gradient(2px 2px at 80px 40px,#ddd,rgba(0,0,0,0)),radial-gradient(2px 2px at 120px 140px,#fff,rgba(0,0,0,0)),radial-gradient(2px 2px at 150px 180px,#fff,rgba(0,0,0,0));background-repeat:repeat;background-size:300px 300px;animation:move-stars 150s linear infinite}.stars-3{background-image:radial-gradient(2px 2px at 50px 50px,#eee,rgba(0,0,0,0)),radial-gradient(2px 2px at 100px 110px,#fff,rgba(0,0,0,0)),radial-gradient(3px 3px at 150px 80px,#ddd,rgba(0,0,0,0)),radial-gradient(3px 3px at 220px 180px,#fff,rgba(0,0,0,0));background-repeat:repeat;background-size:400px 400px;animation:move-stars 100s linear infinite}`}</style>
    <div className="stars stars-1"></div>
    <div className="stars stars-2"></div>
    <div className="stars stars-3"></div>
  </>
);

// --- Mock Leaderboard Data (Sorted) ---
const leaderboardData = [
  { name: "Luna", score: 12500, avatar: "L", color: "bg-blue-500" },
  { name: "Orion", score: 11800, avatar: "O", color: "bg-red-500" },
  { name: "Stella", score: 11250, avatar: "S", color: "bg-orange-500" },
  { name: "Leo", score: 10500, avatar: "L", color: "bg-green-500" },
  { name: "Nova", score: 9800, avatar: "N", color: "bg-indigo-500" },
  { name: "Apollo", score: 9200, avatar: "A", color: "bg-purple-500" },
  { name: "Celeste", score: 8750, avatar: "C", color: "bg-red-500" },
  { name: "Jasper", score: 8200, avatar: "J", color: "bg-orange-500" },
];

// --- Helper Component for the Podium Avatars ---
const PodiumItem = ({ player, rank }) => {
  const isFirst = rank === 1;
  const size = isFirst ? "w-16 h-16" : "w-14 h-14"; // Larger circle for 1st place
  const ringColor =
    rank === 1
      ? "ring-yellow-400"
      : rank === 2
      ? "ring-gray-300"
      : "ring-amber-600"; // Using amber for 3rd place bronze

  return (
    <div
      className={`flex  flex-col items-center gap-2 ${
        isFirst ? "relative -top-4" : ""
      }`}
    >
      {isFirst && <CrownIcon />}
      {/* Solid Color Avatar with Ring */}
      <div
        className={`
        ${size} ${player.color}
        rounded-full ring-2 ${ringColor} ring-offset-2 ring-offset-[#1f1f1f] /* Adjusted offset color */
        flex items-center justify-center
        text-4xl font-bold text-white
        shadow-lg
      `}
      >
        {player.avatar}
      </div>
      <span className="text-lg font-semibold text-white mt-1">
        {player.name}
      </span>
      <span className="text-sm font-bold text-yellow-400">
        {player.score.toLocaleString()}
      </span>
    </div>
  );
};

// --- Helper Component for the List Row (Remains the same) ---
const PlayerRow = ({ player, rank }) => (
  // Solid Row for contrast
  <div className="flex  items-center justify-between bg-black/30 p-3 rounded-xl border border-white/10">
    <div className="flex items-center gap-4">
      <span className="text-lg font-mono text-gray-400 w-6 text-center">
        {rank}
      </span>
      {/* Solid Color Avatar */}
      <div
        className={`w-10 h-10 ${player.color} rounded-full flex items-center justify-center text-lg font-bold text-white`}
      >
        {player.avatar}
      </div>
      <span className="text-lg font-medium text-white">{player.name}</span>
    </div>
    <span className="text-lg font-bold text-yellow-400">
      {player.score.toLocaleString()} pts
    </span>
  </div>
);

// --- Main Leaderboard Component ---
export default function Leaderboard() {
  const topThree = leaderboardData.slice(0, 3);
  const restOfPlayers = leaderboardData.slice(3);

  return (
    <div className="font-sans  bg-black text-white min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(40,_10,_80,_0.5),_transparent_50%)] z-0"></div>

      {/* Glass Frame */}
      <main className="z-10 bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl shadow-purple-500/10 border border-white/20 w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <TrophyIcon />
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Leaderboard
          </h1>
        </div>

        {/* Podium Section (Top 3) */}
        <div className="flex justify-around items-end mb-8 px-4 h-40">
          {" "}
          {/* Added fixed height for alignment */}
          {/* 2nd Place (Left) */}
          <PodiumItem player={topThree[1]} rank={2} />
          {/* 1st Place (Center) */}
          <PodiumItem player={topThree[0]} rank={1} />
          {/* 3rd Place (Right) */}
          <PodiumItem player={topThree[2]} rank={3} />
        </div>

        {/* List Section (4+) */}
        <div className="flex flex-col gap-3">
          {restOfPlayers.map((player, index) => (
            <PlayerRow
              key={player.name}
              player={player}
              rank={index + 4} // Start ranking from 4
            />
          ))}
        </div>
      </main>
    </div>
  );
}
