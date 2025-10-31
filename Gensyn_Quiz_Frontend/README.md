create a user database and then add the lvl the user clear so we can update it and also use the jwt . 








when checking the answers there should be a loading and , error component if error occor 

when updating leaderboard there aslo should be a , loading and error window



set the hrf links 





leaderboard if there is no data then then loading should be there error 404 no data found / no response / and there should be a way to go back into previous select-lelvl

when gathering question and there should be 2-3 seconds time window so the user can see the loading bar . 













[
when in hard or intermidate mode when selecting a option a x icon visible it should be not there 

new ui of leaderboard , add the data to the leaderboard , 
when a loggedin user compeleted a quiz increment the attemnt count and if succedd increase his level . 
when an level is completed add the score if higest from previous also 

top players leaderboard ranking 


]


@@{



when the user completed the quiz add his score in his higest score , if 
prev < new score , then only in not then discard .

if the overall new score like easy + medium + hard . sum of all this score if exceed than the score of 10 user whose score is x then add it to his respected place 


}

10 random question for just play and then need to login  ,
when click on the biggner get the first 10 questions 


lvl when all the answers are correct then only the user can gofurther . 
( if he want to get higher rank then he want to get the quiz right in limited time like the leaderboard will get the users who has correct all question and then compare the time { 10 x time  }  )

when user completed one stage a post to share like i completed the bigner and i am learning forward to the intermideate and i am ahed 30% from the users and like that only till last when completed expert a {image if possible with the username of the user uska logo }

all quiz approxx 100 frontend for this quiz 
the question will go from backend 

24 hrs cooldown (cookie)

after the user complete quiz can go to login if he want to be visible on 
login page 

need to get the total quiz answers and time of completion and based on that the leaderboard will placed 






import React, { useState, useEffect } from "react";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import Quiz from "./components/Quiz.jsx";
import FloatingBubbles from "./components/FloatingBubbles.jsx";
import { quizData } from "./data.js";
import "./App.css";

export default function App() {
  const [currentView, setCurrentView] = useState("leaderboard");
  const [quizLevel, setQuizLevel] = useState(null);
  const [unlockedLevels, setUnlockedLevels] = useState(["beginner"]);

  useEffect(() => {
    try {
      const savedLevels = localStorage.getItem("unlockedLevels");
      if (savedLevels) {
        setUnlockedLevels(JSON.parse(savedLevels));
      } else {
        localStorage.setItem("unlockedLevels", JSON.stringify(["beginner"]));
      }
    } catch (error) {
      console.error("Failed to parse unlocked levels from localStorage", error);
      localStorage.setItem("unlockedLevels", JSON.stringify(["beginner"]));
    }
  }, []);

  const handleNavigate = (view, level = null) => {
    if (level) {
      setQuizLevel(level);
    }
    setCurrentView(view);
  };

  const handleQuizComplete = (level, score, totalQuestions) => {
    if (score !== totalQuestions) return;

    let newUnlockedLevels = [...unlockedLevels];
    if (level === "beginner" && !newUnlockedLevels.includes("intermediate")) {
      newUnlockedLevels.push("intermediate");
    } else if (
      level === "intermediate" &&
      !newUnlockedLevels.includes("expert")
    ) {
      newUnlockedLevels.push("expert");
    }

    if (newUnlockedLevels.length > unlockedLevels.length) {
      setUnlockedLevels(newUnlockedLevels);
      localStorage.setItem("unlockedLevels", JSON.stringify(newUnlockedLevels));
    }
  };

  const renderView = () => {
    switch (currentView) {
      case "leaderboard":
        return <Leaderboard onNavigate={handleNavigate} />;
      case "quiz":
        return (
          <Quiz
            questions={quizData[quizLevel].questions}
            level={quizLevel}
            setCurrentView={setCurrentView}
            onGoToLeaderboard={() => handleNavigate("leaderboard")}
            onQuizComplete={handleQuizComplete}
          />
        );
      case "welcome":
      default:
        return (
          <WelcomeScreen
            onNavigate={handleNavigate}
            unlockedLevels={unlockedLevels}
          />
        );
    }
  };

  return (
    <div
      className="relative  min-w-screen min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url("")' }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <FloatingBubbles />
      <div key={currentView} className="w-full h-full animate-fade-in-up z-10">
        {renderView()}
      </div>
    </div>
  );
}

















this is the new quiz ui 
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// --- Static Components & Icons (can be moved to other files) ---
const ParticleBackground = () => (
    <>
        <style>{`@keyframes move-stars{from{background-position:0 0}to{background-position:-10000px 5000px}}.stars{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;display:block;background:transparent}.stars-1{background-image:radial-gradient(1px 1px at 20px 30px,#eee,rgba(0,0,0,0)),radial-gradient(1px 1px at 40px 70px,#fff,rgba(0,0,0,0)),radial-gradient(1px 1px at 50px 160px,#ddd,rgba(0,0,0,0)),radial-gradient(1px 1px at 90px 40px,#fff,rgba(0,0,0,0)),radial-gradient(2px 2px at 130px 80px,#fff,rgba(0,0,0,0)),radial-gradient(2px 2px at 160px 120px,#ddd,rgba(0,0,0,0));background-repeat:repeat;background-size:200px 200px;animation:move-stars 200s linear infinite}.stars-2{background-image:radial-gradient(1px 1px at 10px 50px,#eee,rgba(0,0,0,0)),radial-gradient(1px 1px at 60px 90px,#fff,rgba(0,0,0,0)),radial-gradient(2px 2px at 80px 40px,#ddd,rgba(0,0,0,0)),radial-gradient(2px 2px at 120px 140px,#fff,rgba(0,0,0,0)),radial-gradient(2px 2px at 150px 180px,#fff,rgba(0,0,0,0));background-repeat:repeat;background-size:300px 300px;animation:move-stars 150s linear infinite}.stars-3{background-image:radial-gradient(2px 2px at 50px 50px,#eee,rgba(0,0,0,0)),radial-gradient(2px 2px at 100px 110px,#fff,rgba(0,0,0,0)),radial-gradient(3px 3px at 150px 80px,#ddd,rgba(0,0,0,0)),radial-gradient(3px 3px at 220px 180px,#fff,rgba(0,0,0,0));background-repeat:repeat;background-size:400px 400px;animation:move-stars 100s linear infinite}`}</style>
        <div className="stars stars-1"></div><div className="stars stars-2"></div><div className="stars stars-3"></div>
    </>
);

const CheckIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>);
const XIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);

// A simple result screen placeholder, since the original was in another file.
const QuizResult = ({ score, totalQuestions, onRestart, onGoToLeaderboard, onQuizComplete, level }) => (
  <div className="text-center flex flex-col items-center bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl shadow-purple-500/10 border border-white/20">
    <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Quiz Completed!</h2>
    <p className="text-xl text-gray-300 mb-6">Your final score is:</p>
    <p className="text-6xl font-bold mb-8">{score} <span className="text-2xl text-gray-400">/ {totalQuestions}</span></p>
    <div className="flex gap-4">
        <button onClick={onRestart} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
            Restart Quiz
        </button>
        <button onClick={onGoToLeaderboard} className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
            View Leaderboard
        </button>
    </div>
  </div>
);


const QUESTION_TIME = 15;

export default function Quiz({ setCurrentView, level, onGoToLeaderboard, onQuizComplete }) {
  // --- STATE AND REFS (from original code) ---
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState(
    
    [   {
      "id": "q1",
      "question": "What does CSS stand for?",
      "options": [
        "Cascading Style Sheets",
        "Creative Style System",
        "Computer Style Syntax",
        "Colorful Style Sheets"
      ],
      "answer": "Cascading Style Sheets"
    },
    {
      "id": "q2",
      "question": "Which HTML tag is used to define an unordered list?",
      "options": [
        "<ol>",
        "<li>",
        "<ul>",
        "<list>"
      ],
      "answer": "<ul>"
    },
    {
      "id": "q3",
      "question": "What is the correct syntax for referring to an external script called 'app.js'?",
      "options": [
        "<script href='app.js'>",
        "<script name='app.js'>",
        "<script src='app.js'>",
        "<script file='app.js'>"
      ],
      "answer": "<script src='app.js'>"
    },
    {
      "id": "q4",
      "question": "In React, what hook would you use to manage state in a functional component?",
      "options": [
        "useEffect",
        "useState",
        "useContext",
        "useReducer"
      ],
      "answer": "useState"
    },
    {
      "id": "q5",
      "question": "Which of the following is NOT a JavaScript data type?",
      "options": [
        "String",
        "Boolean",
        "Number",
        "Character"
      ],
      "answer": "Character"
    }]
  
  
  ); // Default to empty array
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [totalTimeLeft, setTotalTimeLeft] = useState(0);
  const timerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true); // Start as true

  // --- TIMER LOGIC (from original code) ---
//   const resetTimer = () => {
//     if (timerRef.current) clearInterval(timerRef.current);
//     setTimeLeft(QUESTION_TIME);
//     timerRef.current = setInterval(() => {
//         setTimeLeft((prev) => {
//             if (prev <= 1) {
//                 handleOptionClick(null); // Auto-submit when time runs out
//                 return 0;
//             }
//             return prev - 1;
//         });
//     }, 1000);
//   };

 const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(QUESTION_TIME);
    timerRef.current = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
  };

  // --- DATA FETCHING (from original code, improved) ---
  useEffect(() => {
    let lvltype;
    if (level === "beginner") {
      lvltype = "easy-questions";
    } else if (level === "intermediate") {
      lvltype = "medium-questions";
    } else if (level === "expert") {
      lvltype = "hard-questions";
    }

    const getQuestions = async () => {
      if (!lvltype) return;
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/users/get/${lvltype}`);
        setQuestions(res.data.QuestionBank || []);
      } catch (error) {
        console.error("Error in getting questions", error);
        setQuestions([]); // Set to empty on error to prevent crashes
      } finally {
        setIsLoading(false);
      }
    };

    getQuestions();
  }, [level]); // Dependency on level prop

  useEffect(() => {
      // Start timer only when questions are loaded
      // if (!isLoading && questions.length > 0) {
          resetTimer();
      // }
      return () => clearInterval(timerRef.current);
  }, [currentQuestionIndex]);
  // }, [currentQuestionIndex, isLoading, questions.length]);


   useEffect(() => {
    if ((level == "expert" || "intermediate") && selectedOption) {
      // if (level == "expert" || ("intermediate" && selectedOption)) {
      // console.log("This is statefrom inside if ");

      // console.log("This is statefrom inside if ", questions?.length);
      // console.log("this is currindex",currentQuestionIndex)
      if (currentQuestionIndex == 9) {
        const getScore = async () => {
          setIsLoading(true);
          try {
            const response = await axios.post(
              `http://localhost:3000/api/v1/users/check/${
                level == "expert" ? "hard" : "medium"
              }-questions-answers`,
              { data: answers, totalTimeLeft }
            );
            // console.log("this is response", response);

            setScore(response?.data?.TotalScoreIs);
            setIsLoading(false);
          } catch (error) {
            console.error("Error in checking the answers", error);
          }
        };
        getScore();
      }
    }
  }, [selectedOption]);

    const handleTimeUp = () => handleOptionClick(null);


  // --- EVENT HANDLERS (from original code, improved and corrected) ---
  const handleOptionClick = async (option) => {
    if (selectedOption !== null) return;

    clearInterval(timerRef.current);
    setTotalTimeLeft((prev) => prev + timeLeft);
    setTimeLeft(QUESTION_TIME);
    // setSelectedOption(option || "timed-out");
    
    // const currentQuestion = questions[currentQuestionIndex];
    
    setAnswers((prev) => [
      ...prev,
      {
        id: questions[currentQuestionIndex]?.id,
        question: questions[currentQuestionIndex].question,
        answer: option,
      },
    ]);

    

    // const newAnswer = {
    //   id: currentQuestion?.id,
    //   question: currentQuestion.question,
    //   answer: option,
    // };
    // const updatedAnswers = [...answers, newAnswer];
    // setAnswers(updatedAnswers);


    
    // --- SCORING LOGIC ---
    // For expert/intermediate, score is calculated on the backend.
    // For beginner, we calculate it on the front end.
    if (level === "beginner") {
      const isCorrect = option === currentQuestion.answer;
      if (isCorrect) setScore((prevScore) => prevScore + 1);
    }

    setSelectedOption(option || "timed-out");

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        // console.log("the index is incresed mate  ");
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1500);

    // const is LastQuestion = currentQuestionIndex === questions.length - 1;

    // If expert/intermediate and it's the last question, send answers to backend.
    // if ((level === "expert" || level === "intermediate") && isLastQuestion) {
    //     setIsLoading(true);
    //     try {
    //         const response = await axios.post(
    //             `http://localhost:3000/api/v1/users/check/${level === "expert" ? "hard" : "medium"}-questions-answers`,
    //             { data: updatedAnswers, totalTimeLeft }
    //         );
    //         setScore(response?.data?.TotalScoreIs || 0);
    //     } catch (error) {
    //         console.error("Error in checking the answers", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    // setTimeout(() => {
    //   if (isLastQuestion) {
    //     setShowResult(true);
    //     onQuizComplete(level);
    //   } else {
    //     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    //     setSelectedOption(null);
    //   }
    // }, 1500);
  };
  
  const handleRestart = () => {
      // This will cause the component to re-fetch questions for the current level
     
       setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
     
      // setCurrentQuestionIndex(0);
      // setAnswers([]);
      // setScore(0);
      // setShowResult(false);
      // setSelectedOption(null);
      // setTotalTimeLeft(0);
  };

  const getButtonClass = (option) => {
    if (!selectedOption) return "bg-white/10 hover:bg-white/20";

    if (level === "expert" || "intermediate") {
      if (selectedOption === option) {
        // Indigo is a strong, neutral selection color. It doesn't imply right or wrong.
        return "bg-indigo-600/80 ring-2 ring-indigo-500 cursor-not-allowed";
      }
      if (selectedOption) {
        // If any option is selected, all others are just disabled.
        return "bg-white/10 cursor-not-allowed opacity-50";
      }
      // Default state before any selection.
      return "bg-white/10 hover:bg-white/20";
    }

    const isCorrectAnswer = option === questions[currentQuestionIndex].answer;
    // console.log("this is corerect answer", isCorrectAnswer);

    if (isCorrectAnswer)
      return "bg-green-500/50 ring-2 ring-green-400 animate-pulse-correct";
    if (option === selectedOption && !isCorrectAnswer)
      return "bg-red-500/50 ring-2 ring-red-400 animate-shake";
    return "bg-white/10 cursor-not-allowed opacity-50";
  };
  

  // if (showResult) {
  //   return (
  //     <div className="font-sans bg-black text-white min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
  //       <ParticleBackground />
  //       <QuizResult
  //         score={score}
  //         totalQuestions={questions.length}
  //         onRestart={handleRestart}
  //         onGoToLeaderboard={onGoToLeaderboard}
  //         setCurrentView={setCurrentView}
  //         onQuizComplete={onQuizComplete}
  //         level={level}
  //       />
  //     </div>
  //   );
  // }

   if (showResult) {
      return (
        <QuizResult
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestart}
          onGoToLeaderboard={onGoToLeaderboard}
          setCurrentView={setCurrentView}
          onQuizComplete={onQuizComplete}
          level={level}
        />
      );
    }


  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const formattedTime = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
  
  return (
    <div className="font-sans bg-black text-white min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(40,_10,_80,_0.5),_transparent_50%)] z-0"></div>

      <div className="w-full max-w-2xl mx-auto z-10 space-y-4">
        <header className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-2xl shadow-purple-500/10 border border-white/20">
          <div className="flex justify-between items-center px-2">
              <div className="text-lg text-gray-300">
                  Question <span className="font-bold">{currentQuestionIndex + 1}</span>/{questions.length}
              </div>
              <div className="text-3xl font-mono bg-black/20 px-6 py-2 rounded-lg border border-white/20">
                  {formattedTime}
              </div>
              <div className="text-lg font-bold text-amber-300">
                  Score: {score}
              </div>
          </div>
        </header>

        <main className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl shadow-purple-500/10 border border-white/20">
          <div className="w-full bg-black/20 rounded-full h-2 mb-6">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-8 text-center text-gray-200 min-h-[6rem] flex items-center justify-center">
            {currentQuestion?.question}
          </h2>

          <div className="space-y-4">
            {currentQuestion?.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== null}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 text-lg flex justify-between items-center ${getButtonClass(option)} ${selectedOption ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span>
                  <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </span>
                {selectedOption && level === "beginner" && option === selectedOption && (
                  option === currentQuestion.answer ? <CheckIcon className="text-green-400" /> : <XIcon className="text-red-400" />
                )}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}


old leaderboard design 

import React, { useEffect } from "react";
import { TrophyIcon, RestartIcon, ShareIcon } from "./Icons.jsx";
import axios from "axios";

export default function QuizResult({
  setCurrentView,
  score,
  totalQuestions,
  onRestart,
  onGoToLeaderboard,
  onQuizComplete,
  level,
}) {

  useEffect(() => {
    if (onQuizComplete) {
      onQuizComplete(level, score, totalQuestions);
    }
  }, []); // Runs only once when the component mounts

  const handleAddDateToLeaderboard = async () => {
    window.location.href = "http://localhost:3000/api/v1/users/auth/discord";

    // try {
    //   const response = await axios.get(
    //     "http://localhost:3000/api/v1/users/auth/discord"
    //   );

    // } catch (error) {
    //   console.error("There was an error while login to discord", error);
    // }
  };
  
  const percentage = Math.round((score / totalQuestions) * 100);
  let performanceQuote =
    percentage >= 80
      ? `Outstanding! You scored better than 80% of players!`
      : percentage >= 50
      ? `Great job! You're in the top half of players.`
      : "Keep practicing and you'll climb the leaderboard!";
  const shareText = `I scored ${score}/${totalQuestions} on this awesome quiz! Can you beat my score? #QuizChallenge`;
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}`;

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 text-center animate-fade-in-up">
      <TrophyIcon className="h-16 w-16 sm:h-20 sm:w-20 text-amber-300 mx-auto" />
      <h2 className="text-3xl font-bold text-white mt-4 mb-2">
        Quiz Finished!
      </h2>
      <p className="text-xl text-gray-300 mb-6">Your final score is:</p>
      <div className="my-8">
        <span className="text-5xl sm:text-6xl font-bold text-amber-300">
          {score}
        </span>
        <span className="text-xl sm:text-2xl text-gray-400">
          {" "}
          / {totalQuestions}
        </span>
      </div>
      <p className="text-lg text-indigo-300 mb-8 italic">
        "{performanceQuote}"
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* <button onClick={onRestart} className="flex-1 flex items-center justify-center bg-white/10 text-white font-bold text-lg py-3 rounded-xl hover:bg-white/20 transition-all transform hover:scale-105"><RestartIcon/> Try Again</button> */}

          <button
            onClick={onRestart}
            className="flex-1 flex items-center justify-center bg-white/10 text-white font-bold text-lg py-3 rounded-xl hover:bg-white/20 transition-all transform hover:scale-105"
          >
            <RestartIcon /> Try Again
          </button>
          {/* <button onClick={onGoToLeaderboard} className="flex-1 bg-indigo-600 text-white font-bold text-lg py-3 rounded-xl hover:bg-indigo-700 transition-all transform hover:scale-105">Add score to leaderboard</button> */}
          <button
            onClick={handleAddDateToLeaderboard}
            className="flex-1 bg-indigo-600 text-white font-bold text-lg py-3 rounded-xl hover:bg-indigo-700 transition-all transform hover:scale-105"
          >
            Add score to leaderboard
          </button>
        </div>
        <a
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-black text-white font-bold text-lg py-3 rounded-xl hover:bg-gray-800 transition-all transform hover:scale-105"
        >
          <ShareIcon /> Post to X
        </a>
      </div>
    </div>
  );
}
