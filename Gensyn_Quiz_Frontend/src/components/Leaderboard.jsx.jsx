import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import ErrorComponent from "../quiz/components/ErrorComponent";
import { useNavigate } from "react-router-dom";
import default_profile from "../assets/default_profile.jpg"

// --- SVG Icons (TrophyIcon and CrownIcon remain the same) ---

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

// --- UPDATED Mock Leaderboard Data ---
// Added avatarUrl, fallbackLetter, and colorHex
// const leaderboardData = [
//   //   { name: "Luna", score: 12500, avatarUrl: "https://res.cloudinary.com/mytube2132/image/upload/v1757182165/t5je0z1b3osldsofxxaj.jpg", fallbackLetter: "L", colorHex: "3B82F6" },
//   {
//     name: "Orion",
//     score: 11800,
//     avatarUrl:
//       "https://res.cloudinary.com/mytube2132/image/upload/v1757444697/yzuqac0josby725jwp8y.jpg",
//     fallbackLetter: "O",
//     colorHex: "EF4444",
//   },
//   {
//     name: "Stella",
//     score: 11250,
//     avatarUrl: null,
//     fallbackLetter: "S",
//     colorHex: "F97316",
//   }, // This one will use fallback
//   {
//     name: "Leo",
//     score: 10500,
//     avatarUrl: "https://broken.url/image.png",
//     fallbackLetter: "L",
//     colorHex: "22C55E",
//   }, // This one will fail and use fallback
//   {
//     name: "Nova",
//     score: 9800,
//     avatarUrl: "https://placehold.co/100/6366F1/FFF?text=N",
//     fallbackLetter: "N",
//     colorHex: "6366F1",
//   },
//   {
//     name: "Apollo",
//     score: 9200,
//     avatarUrl: "https://placehold.co/100/8B5CF6/FFF?text=A",
//     fallbackLetter: "A",
//     colorHex: "8B5CF6",
//   },
//   {
//     name: "Celeste",
//     score: 8750,
//     avatarUrl: "https://placehold.co/100/EF4444/FFF?text=C",
//     fallbackLetter: "C",
//     colorHex: "EF4444",
//   },
//   {
//     name: "Jasper",
//     score: 8200,
//     avatarUrl: null,
//     fallbackLetter: "J",
//     colorHex: "F97316",
//   }, // This one will use fallback
// ];

// --- NEW Avatar Component ---
// This component handles the logic for showing an image or a default placeholder.
const Avatar = ({ avatarUrl, fallbackLetter, colorHex, size }) => {
  const hex = colorHex?.replace("#", "");
  const placeholderUrl = `https://placehold.co/100/${hex}/FFFFFF?text=${fallbackLetter}`;

  return (
    <img
      src={avatarUrl || default_profile} // Use provided URL, or placeholder if URL is null/undefined
      alt={fallbackLetter}
      className={`${size} rounded-full object-cover`} // object-cover ensures image fills the circle
      onError={(e) => {
        // If the provided avatarUrl *also* fails to load (e.g., 404),
        // replace it with the placeholderUrl.
        if (e.target.src !== placeholderUrl) {
          e.target.src = placeholderUrl;
        }
      }}
    />
  );
};

// --- UPDATED PodiumItem Component ---
const PodiumItem = ({ player, rank }) => {
  // console.log("this is player from podiumitem",player)
  // console.log("this is url",`https://cdn.discordapp.com/avatars/${player?.userId}/${player?.avatar_hash}.png`)
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
      className={`flex  flex-col items-center gap-1 ${
        isFirst ? "relative -top-4" : ""
      }`}
    >
      {isFirst && <CrownIcon />}
      {/* Replaced div with Avatar component */}
      <div
        className={`
        rounded-full ring-2 ${ringColor} ring-offset-2 ring-offset-[#1f1f1f] 
        shadow-lg
      `}
      >
        <Avatar
        // (player?.discord_Id ) ?
        //   `https://cdn.discordapp.com/avatars/${player?.discord_Id}/${player?.avatar_hash}.png` : null
          avatarUrl={(player?.discord_Id && player?.avatar_hash) ? `https://cdn.discordapp.com/avatars/${player?.discord_Id}/${player?.avatar_hash}.png` : default_profile}
          fallbackLetter={player?.fallbackLetter}
          colorHex={player?.colorHex}
          size={size}
        />
      </div>
      <span className="text-lg font-figtree font-semibold text-white mt-1">
        {player?.userName}
      </span>
      <span className="text-sm font-figtree font-bold text-yellow-400">
        {player?.totalScore?.toLocaleString()}
      </span>
    </div>
  );
};

// --- UPDATED PlayerRow Component ---
const PlayerRow = ({ player, rank }) => (
  console.log("this is player", player),
  (
    <div className="flex  items-center justify-between bg-black/30 p-3 rounded-xl border border-white/10">
      <div className="flex items-center gap-4">
        <span className="text-lg font-mono text-gray-400 w-6 text-center">
          {rank}
        </span>
        {/* Replaced div with Avatar component */}
        <Avatar
          // avatarUrl={`https://cdn.discordapp.com/avatars/${player?.discord_Id}/${player?.avatar_hash}.png`}
          avatarUrl={(player?.discord_Id && player?.avatar_hash) ? `https://cdn.discordapp.com/avatars/${player?.discord_Id}/${player?.avatar_hash}.png` : default_profile}
          fallbackLetter={player.fallbackLetter}
          colorHex={player.colorHex}
          size="w-10 h-10"
        />
        <span className="text-lg font-figtree font-medium text-white">
          {player.userName}
        </span>
      </div>
      <span className="text-lg font-figtree font-bold text-[#ffb997]">
        {player.totalScore.toLocaleString()} pts
      </span>
    </div>
  )
);

// --- Main Leaderboard Component (Unchanged) ---
export default function Leaderboard() {
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const userHigestscore = JSON.parse(localStorage?.getItem('userData'))?.totalHighScore
    

  const [leaderboardData, setleaderboardData] = useState(null);

  const handleDismissError = () => {
    navigate("/select-lvl");
  };

  useEffect(() => {
    setIsLoading(true);

    const getLeaderboardData = async () => {
      try {
        const res = await axios.get(
          "https://quiz-backend-zyav.onrender.com/api/v1/users/get/leaderboard-data"
          // "http://localhost:3000/api/v1/users/get/leaderboard-data"
        );
        // console.log("this is res",res.data.top10LeaderboardData)
        setIsLoading(false);
        setleaderboardData(res.data.top10LeaderboardData);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        setErrorMsg(error.message);
        console.error("Error while geting user data", error);
      }
    };

    getLeaderboardData();
  }, []);

  const topThree = leaderboardData?.slice(0, 3);
  const restOfPlayers = leaderboardData?.slice(3);

  // console.log("topthree",topThree)
  // console.log("restof player",restOfPlayers)

  if (isLoading) {
    return (
      <div className="flex-col h-full w-full flex items-center justify-center">
        <Loader width={55} height={55} />
        <p
          className="
          text-lg 
          mt-4 
          font-semibold 
          text-transparent 
          bg-clip-text 
          bg-gradient-to-r 
        from-pink-800 to-[#fad7d1]
          animate-pulse
          "
        >
          {/* from-yellow-400 to-orange-500 */}
          {/* from-amber-400 to-red-600 */}
          {/* from-pink-400 to-orange-400 */}
          {/* from-indigo-400 to-purple-500 */}
          Verifying leaderboard data checksum...
          {/* Syncing with question database...
          Compiling the question bank...
          Please wait while we calibrate the difficulty.
          Verifying question bank checksum...
          Building secure assessment environment...
          Secure channel established. Fetching data... */}
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorComponent
        onCut={handleDismissError}
        title={"404 Not found"}
        onRetry={() => setIsError(false)}
        message={errorMsg}
      />
    );
  }

  return (
    <div className="font-sans bg-black text-white min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(40,_10,_80,_0.5),_transparent_50%)] z-0"></div>

      {/* <div className=" top-40 left-8 absolute z-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
          />
        </svg>
      </div> */}

       <div className="mb-3 flex items-center justify-between w-full text-[#c2bebe] bg-white/10 font-figtree   backdrop-blur-lg  py-2 px-4 rounded-2xl shadow-2xl shadow-purple-500/10 border border-white/20 text-center  ">
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
        <div>Higest score : {userHigestscore || 0}</div>
      </div>

      <main className="z-10 bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-2xl shadow-purple-500/10 border border-white/20 w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-center mb-2">
          {/* <TrophyIcon /> */}
          <Loader width={45} animate={false} />
          <h1 className="ml-2 font-figtree bg-gradient-to-r from-[#fad7d1] to-[#ffb3a6] bg-clip-text text-transparent text-3xl  font-extrabold">
            {/* <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"> */}
            {/* Leaderboard */}
            Top perfomer
          </h1>
        </div>

        {/* Podium Section (Top 3) */}
        <div className="flex justify-around items-end mb-8 px-4 h-40">
          {" "}
          {/* Added fixed height for alignment */}
          {/* 2nd Place (Left) */}
          <PodiumItem player={topThree?.[1]} rank={2} />
          {/* 1st Place (Center) */}
          <PodiumItem player={topThree?.[0]} rank={1} />
          {/* 3rd Place (Right) */}
          <PodiumItem player={topThree?.[2]} rank={3} />
        </div>

        {/* List Section (4+) */}
        <div className="flex flex-col gap-3">
          {restOfPlayers?.map((player, index) => (
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
