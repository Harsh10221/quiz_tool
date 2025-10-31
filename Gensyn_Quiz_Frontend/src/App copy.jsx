

import React from 'react';

// --- SVG Icons ---
const TrophyIcon = () => (
    <svg className="w-16 h-16 text-transparent" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <defs>
            <linearGradient id="trophyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#c084fc' }} />
                <stop offset="100%" style={{ stopColor: '#ec4899' }} />
            </linearGradient>
        </defs>
        <path fill="url(#trophyGradient)" d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" stroke="url(#trophyGradient)"/>
        <path fill="url(#trophyGradient)" d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" stroke="url(#trophyGradient)"/>
        <path fill="url(#trophyGradient)" d="M4 22h16" stroke="url(#trophyGradient)"/>
        <path fill="url(#trophyGradient)" d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.87 18.75 7 20.24 7 22" stroke="url(#trophyGradient)"/>
        <path fill="url(#trophyGradient)" d="M14 14.66V17c0 .55.47.98.97 1.21C16.13 18.75 17 20.24 17 22" stroke="url(#trophyGradient)"/>
        <path fill="url(#trophyGradient)" d="M18 2H6v7a6 6 0 0 0 12 0V2Z" stroke="url(#trophyGradient)"/>
    </svg>
);

const RestartIcon = () => (
    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4"/>
        <path d="M4 13a8.1 8.1 0 0 0 15.5 2M20 19v-4h-4"/>
    </svg>
);

const XIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

// --- Particle Background Component ---
const ParticleBackground = () => (
    <>
        <style>{`@keyframes move-stars{from{background-position:0 0}to{background-position:-10000px 5000px}}.stars{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;display:block;background:transparent}.stars-1{background-image:radial-gradient(1px 1px at 20px 30px,#eee,rgba(0,0,0,0)),radial-gradient(1px 1px at 40px 70px,#fff,rgba(0,0,0,0)),radial-gradient(1px 1px at 50px 160px,#ddd,rgba(0,0,0,0)),radial-gradient(1px 1px at 90px 40px,#fff,rgba(0,0,0,0)),radial-gradient(2px 2px at 130px 80px,#fff,rgba(0,0,0,0)),radial-gradient(2px 2px at 160px 120px,#ddd,rgba(0,0,0,0));background-repeat:repeat;background-size:200px 200px;animation:move-stars 200s linear infinite}.stars-2{background-image:radial-gradient(1px 1px at 10px 50px,#eee,rgba(0,0,0,0)),radial-gradient(1px 1px at 60px 90px,#fff,rgba(0,0,0,0)),radial-gradient(2px 2px at 80px 40px,#ddd,rgba(0,0,0,0)),radial-gradient(2px 2px at 120px 140px,#fff,rgba(0,0,0,0)),radial-gradient(2px 2px at 150px 180px,#fff,rgba(0,0,0,0));background-repeat:repeat;background-size:300px 300px;animation:move-stars 150s linear infinite}.stars-3{background-image:radial-gradient(2px 2px at 50px 50px,#eee,rgba(0,0,0,0)),radial-gradient(2px 2px at 100px 110px,#fff,rgba(0,0,0,0)),radial-gradient(3px 3px at 150px 80px,#ddd,rgba(0,0,0,0)),radial-gradient(3px 3px at 220px 180px,#fff,rgba(0,0,0,0));background-repeat:repeat;background-size:400px 400px;animation:move-stars 100s linear infinite}`}</style>
        <div className="stars stars-1"></div><div className="stars stars-2"></div><div className="stars stars-3"></div>
    </>
);


// --- Main Result Component ---
export default function QuizResult({
  score,
  totalQuestions,
  onRestart,
  onGoToLeaderboard,
  onPostToX,
}) {
  return (
    <div className="font-sans bg-black text-white min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* <ParticleBackground /> */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(40,_10,_80,_0.5),_transparent_50%)] z-0"></div>

      <main className="z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl shadow-purple-500/10 border border-white/20 text-center flex flex-col items-center w-full max-w-md">
        
        <TrophyIcon />

        <h2 className="text-3xl font-bold mt-4 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Quiz Finished!
        </h2>
        
        <p className="text-lg text-gray-300 mb-6">Your final score is:</p>
        
        <p className="text-6xl font-bold mb-6 text-white">
          {score}
          <span className="text-2xl text-gray-400"> / {totalQuestions}</span>
        </p>
        
        <p className="text-lg text-gray-400 italic mb-10">
          "Keep practicing and you'll climb the leaderboard!"
        </p>

        <div className="flex flex-col gap-4 w-full">
          {/* Primary Action Button */}
          <button
            onClick={onGoToLeaderboard}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Add score to leaderboard
          </button>
          
          {/* Secondary Action Button */}
          <button
            onClick={onRestart}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 border border-white/20 flex items-center justify-center"
          >
            <RestartIcon />
            Try Again
          </button>
          
          {/* Tertiary Action Button */}
          <button
            onClick={onPostToX}
            className="w-full bg-black/50 hover:bg-black/80 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 border border-white/20 flex items-center justify-center"
          >
            <XIcon />
            Post to X
          </button>
        </div>

      </main>
    </div>
  );
}



