// import React, { useState, useEffect, useRef } from "react";


// import CircularTimer from "./CircularTimer.jsx";

// import QuizResult from "./QuizResult.jsx";

// import { CheckIcon, XIcon } from "./Icons.jsx";

// import axios from "axios";

// const QUESTION_TIME = 15;

// // questions

// export default function Quiz({
//   setCurrentView,

//   level,

//   onGoToLeaderboard,

//   onQuizComplete,
// }) {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   const [questions, setquestions] = useState(null);

//   const [answers, setAnswers] = useState([]);

//   const [score, setScore] = useState(0);

//   const [showResult, setShowResult] = useState(false);

//   const [selectedOption, setSelectedOption] = useState(null);

//   const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

//   const [totalTimeLeft, setTotalTimeLeft] = useState(0);

//   const timerRef = useRef(null);

//   const [isLoading, setIsLoading] = useState(false);

//   const resetTimer = () => {
//     if (timerRef.current) clearInterval(timerRef.current);

//     setTimeLeft(QUESTION_TIME);

//     timerRef.current = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//   };

//   useEffect(() => {
//     // console.log("THis is level", level);

//     let lvltype;

//     if (level == "beginner") {
//       lvltype = "easy-questions";
//     }

//     if (level == "intermediate") {
//       lvltype = "medium-questions";
//     }

//     if (level == "expert") {
//       lvltype = "hard-questions";
//     }

//     const getQuestions = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:3000/api/v1/users/get/${lvltype}`
//         );

//         // console.log("this is res ", res);

//         setquestions(res.data.QuestionBank);
//       } catch (error) {
//         console.error("Error in getting questions");
//       }
//     };

//     getQuestions();
//   }, []);

//   useEffect(() => {
//     if ((level == "expert" || "intermediate") && selectedOption) {
//       // if (level == "expert" || ("intermediate" && selectedOption)) {

//       // console.log("This is statefrom inside if ");

//       // console.log("This is statefrom inside if ", questions?.length);

//       // console.log("this is currindex",currentQuestionIndex)

//       if (currentQuestionIndex == 9) {
//         const getScore = async () => {
//           setIsLoading(true);

//           try {
//             const response = await axios.post(
//               `http://localhost:3000/api/v1/users/check/${
//                 level == "expert" ? "hard" : "medium"
//               }-questions-answers`,

//               { data: answers, totalTimeLeft }
//             );

//             // console.log("this is response", response);

//             setScore(response?.data?.TotalScoreIs);

//             setIsLoading(false);
//           } catch (error) {
//             console.error("Error in checking the answers", error);
//           }
//         };

//         getScore();
//       }
//     }
//   }, [selectedOption]);

//   useEffect(() => {
//     resetTimer();

//     return () => clearInterval(timerRef.current);
//   }, [currentQuestionIndex]);

//   const handleTimeUp = () => handleOptionClick(null);

//   const handleOptionClick = (option) => {
//     // console.log("the handle option check function runs ");

//     if (selectedOption !== null) return;

//     clearInterval(timerRef.current);

//     setTotalTimeLeft((prev) => prev + timeLeft);

//     setTimeLeft(QUESTION_TIME);

//     // console.log("This is state",questions[currentQuestionIndex]);

//     setAnswers((prev) => [
//       ...prev,

//       {
//         id: questions[currentQuestionIndex]?.id,

//         question: questions[currentQuestionIndex].question,

//         answer: option,
//       },
//     ]);

//     if (level !== "expert" || "intermediate") {
//       const isCorrect = option === questions[currentQuestionIndex].answer;

//       if (isCorrect) setScore((prevScore) => prevScore + 1);
//     }

//     setSelectedOption(option || "timed-out");

//     setTimeout(() => {
//       if (currentQuestionIndex < questions.length - 1) {
//         // console.log("the index is incresed mate  ");

//         setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

//         setSelectedOption(null);
//       } else {
//         setShowResult(true);
//       }
//     }, 1500);
//   };

//   const handleRestart = () => {
//     setCurrentQuestionIndex(0);

//     setScore(0);

//     setShowResult(false);

//     setSelectedOption(null);
//   };

//   const getButtonClass = (option) => {
//     if (!selectedOption) return "bg-white/10 hover:bg-white/20";

//     if (level === "expert" || "intermediate") {
//       if (selectedOption === option) {
//         // Indigo is a strong, neutral selection color. It doesn't imply right or wrong.

//         return "bg-indigo-600/80 ring-2 ring-indigo-500 cursor-not-allowed";
//       }

//       if (selectedOption) {
//         // If any option is selected, all others are just disabled.

//         return "bg-white/10 cursor-not-allowed opacity-50";
//       }

//       // Default state before any selection.

//       return "bg-white/10 hover:bg-white/20";
//     }

//     const isCorrectAnswer = option === questions[currentQuestionIndex].answer;

//     // console.log("this is corerect answer", isCorrectAnswer);

//     if (isCorrectAnswer)
//       return "bg-green-500/50 ring-2 ring-green-400 animate-pulse-correct";

//     if (option === selectedOption && !isCorrectAnswer)
//       return "bg-red-500/50 ring-2 ring-red-400 animate-shake";

//     return "bg-white/10 cursor-not-allowed opacity-50";
//   };

//   if (showResult) {
//     return (
//       <QuizResult
//         score={score}
//         totalQuestions={questions.length}
//         onRestart={handleRestart}
//         onGoToLeaderboard={onGoToLeaderboard}
//         setCurrentView={setCurrentView}
//         onQuizComplete={onQuizComplete}
//         level={level}
//       />
//     );
//   }

//   const currentQuestion = questions?.[currentQuestionIndex];

//   return (
//     <div className="w-full max-w-md mx-auto bg-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
//       <div className="flex justify-between items-center mb-4">
//         <p className="text-lg text-gray-300">
//           Question {currentQuestionIndex + 1}/{questions?.length}
//         </p>

//         <p className="text-lg font-bold text-amber-300">Score: {score}</p>
//       </div>

//       <div key={currentQuestionIndex} className="animate-fade-in-up">
//         <div className="flex justify-center my-6">
//           <CircularTimer timeLeft={timeLeft} onTimeUp={handleTimeUp} />
//         </div>

//         <div className="text-center min-h-[100px] mb-6">
//           <h2 className="text-xl sm:text-2xl font-bold text-white">
//             {currentQuestion?.question}
//           </h2>
//         </div>

//         <div className="space-y-3">
//           {currentQuestion?.options?.map((option, index) => (
//             <button
//               key={index}
//               onClick={() => handleOptionClick(option)}
//               disabled={selectedOption !== null}
//               className={`w-full text-left p-4 rounded-lg text-white font-medium text-lg transition-all duration-300 flex justify-between items-center

//                  ${getButtonClass(option)}`}
//             >
//               <span>{option}</span>

//               {level !== "expert" ||
//                 ("intermediate" &&
//                   selectedOption &&
//                   option === questions[currentQuestionIndex].answer && (
//                     <CheckIcon />
//                   ))}

//               {level !== "expert" ||
//                 ("intermediate" &&
//                   selectedOption === option &&
//                   option !== questions[currentQuestionIndex].answer && (
//                     <XIcon />
//                   ))}

//               {/* {selectedOption} */}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // if (!selectedOption) return "bg-white/10 hover:bg-white/20";

// //       if (level === "expert" || "intermediate") {
// //         if (selectedOption === option) {
// //           // Indigo is a strong, neutral selection color. It doesn't imply right or wrong.

// //           return "bg-indigo-600/80 ring-2 ring-indigo-500 cursor-not-allowed";
// //         }

// //         if (selectedOption) {
// //           // If any option is selected, all others are just disabled.

// //           return "bg-white/10 cursor-not-allowed opacity-50";
// //         }

// //         // Default state before any selection.

// //         return "bg-white/10 hover:bg-white/20";
// //       }

// //       const isCorrectAnswer = option === questions[currentQuestionIndex].answer;

// //       // console.log("this is corerect answer", isCorrectAnswer);

// //       if (isCorrectAnswer)
// //         return "bg-green-500/50 ring-2 ring-green-400 animate-pulse-correct";

// //       if (option === selectedOption && !isCorrectAnswer)
// //         return "bg-red-500/50 ring-2 ring-red-400 animate-shake";

// //       return "bg-white/10 cursor-not-allowed opacity-50";


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



