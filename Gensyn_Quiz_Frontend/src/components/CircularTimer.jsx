import React, { useEffect } from "react";

const QUESTION_TIME = 15;

export default function CircularTimer({ timeLeft, onTimeUp }) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (timeLeft / QUESTION_TIME) * circumference;

  useEffect(() => {
    // console.log("i am from timer ",timeLeft)
    // console.log("i am from timer this is on timeup ",onTimeUp)
    if (timeLeft === 0 && onTimeUp) {
      // console.log("i am from timer calling the ontimepu function mate  ")
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  return (
    // <div className="relative w-20 h-20 sm:w-24 sm:h-24">
    //   <svg className="w-full h-full" viewBox="0 0 100 100">
    //     <circle
    //       className="text-white/10"
    //       strokeWidth="7"
    //       stroke="currentColor"
    //       fill="transparent"
    //       r="45"
    //       cx="50"
    //       cy="50"
    //     />
    //     <circle
    //       className="text-indigo-500"
    //       strokeWidth="7"
    //       strokeDasharray={circumference}
    //       strokeDashoffset={offset}
    //       strokeLinecap="round"
    //       stroke="currentColor"
    //       fill="transparent"
    //       r="45"
    //       cx="50"
    //       cy="50"
    //       transform="rotate(-90 50 50)"
    //       style={{ transition: "stroke-dashoffset 1s linear" }}
    //     />
    //   </svg>
    //   <span className="absolute inset-0 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
  
    // <div className="     text-3xl font-mono bg-black/20 px-6 py-2   rounded-lg border border-white/20">
    //   {timeLeft}
    // </div>

    //   </span>
    // </div>

<div className="
  relative overflow-hidden  /* This parent creates the stacking context */
  text-3xl font-mono bg-black/20 px-6 py-2 rounded-lg border border-white/20
">
  
  {/* 1. The Time Left (Text) */}
  {/* We wrap it in a div with `relative` and a high z-index (z-20) */}
  <div className=" relative z-20">
    {timeLeft}
  </div>

  {/* 2. The Progress Bar */}
  <div 
    className="
      absolute left-0 bottom-0 h-full 
        bg-purple-700
     
      z-10  /* Lower z-index (z-10) so it's behind the text */
    "
    style={{
      width: `${(timeLeft / QUESTION_TIME) * 100}%`,
      transition: "width 1s linear",
      /* This adds the purple glow you wanted */
      boxShadow: "0 0 10px 2px rgba(139, 92, 246, 0.7)"
    }}
  ></div>

</div>
  );
}
