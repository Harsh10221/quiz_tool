import React, { useState, useEffect, useRef } from "react";
import CircularTimer from "./CircularTimer.jsx";
import QuizResult from "./QuizResult.jsx";
import { CheckIcon, XIcon } from "./Icons.jsx";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader.jsx";

const QUESTION_TIME = 15;

// --- Mock Quiz Data ---
const quizData = [
  {
    question: "Which hook is used for state management in React?",
    options: ["useEffect", "useContext", "useState", "useRef"],
    correctAnswer: "useState",
  },
  {
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JSON Syntax Extension",
      "JavaScript XHR",
    ],
    correctAnswer: "JavaScript XML",
  },
  {
    question: "What is the virtual DOM?",
    options: [
      "A copy of the real DOM kept in memory",
      "A browser feature",
      "A JavaScript library",
      "An HTML template",
    ],
    correctAnswer: "A copy of the real DOM kept in memory",
  },
  {
    question: "How do you pass data from a parent to a child component?",
    options: ["Using state", "Using props", "Using context", "Using Redux"],
    correctAnswer: "Using props",
  },
  {
    question:
      "Which method is called once in a component's lifecycle when it is first rendered?",
    options: [
      "componentDidUpdate",
      "componentWillUnmount",
      "render",
      "componentDidMount",
    ],
    correctAnswer: "componentDidMount",
  },
];

// --- Mock Leaderboard Data ---
const initialLeaderboard = [
  { name: "Alice", score: 5 },
  { name: "Bob", score: 4 },
  { name: "Charlie", score: 3 },
  { name: "David", score: 2 },
];

// --- SVG Icons ---
// const CheckIcon = ({ className }) => (
//     <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M20 6 9 17l-5-5" />
//     </svg>
// );

// const TrophyIcon = ({ className }) => (
//     <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.87 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.13 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
//     </svg>
// );

// --- Particle Background Component ---
// This component creates an animated starfield background using CSS.
// const ParticleBackground = () => {
//     return (
//         <>
//             <style>
//                 {`
//                 @keyframes move-stars {
//                     from { background-position: 0 0; }
//                     to { background-position: -10000px 5000px; }
//                 }
//                 .stars {
//                     position: absolute;
//                     top: 0;
//                     left: 0;
//                     right: 0;
//                     bottom: 0;
//                     width: 100%;
//                     height: 100%;
//                     display: block;
//                     background: transparent;
//                 }
//                 .stars-1 {
//                     background-image: radial-gradient(1px 1px at 20px 30px, #eee, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 50px 160px, #ddd, rgba(0,0,0,0)), radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
//                     background-repeat: repeat;
//                     background-size: 200px 200px;
//                     animation: move-stars 200s linear infinite;
//                 }
//                 .stars-2 {
//                      background-image: radial-gradient(1px 1px at 10px 50px, #eee, rgba(0,0,0,0)), radial-gradient(1px 1px at 60px 90px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 80px 40px, #ddd, rgba(0,0,0,0)), radial-gradient(2px 2px at 120px 140px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 150px 180px, #fff, rgba(0,0,0,0));
//                     background-repeat: repeat;
//                     background-size: 300px 300px;
//                     animation: move-stars 150s linear infinite;
//                 }
//                 .stars-3 {
//                      background-image: radial-gradient(2px 2px at 50px 50px, #eee, rgba(0,0,0,0)), radial-gradient(2px 2px at 100px 110px, #fff, rgba(0,0,0,0)), radial-gradient(3px 3px at 150px 80px, #ddd, rgba(0,0,0,0)), radial-gradient(3px 3px at 220px 180px, #fff, rgba(0,0,0,0));
//                     background-repeat: repeat;
//                     background-size: 400px 400px;
//                     animation: move-stars 100s linear infinite;
//                 }
//                 `}
//             </style>
//             <div className="stars stars-1"></div>
//             <div className="stars stars-2"></div>
//             <div className="stars stars-3"></div>
//         </>
//     );
// };

// --- Main App Component ---

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setquestions] = useState(quizData);
  //   const [questions, setquestions] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [totalTimeLeft, setTotalTimeLeft] = useState(0);
  const timerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- Timer Logic ---
  useEffect(() => {
    // console.log("i outside if  ");
    if (!location.state) {
      // console.log("i am runned  ");
      navigate("/select-lvl");
    }
  }, []);

  // console.log("this is location ", location);
  const level = location?.state?.level;
  // console.log("this is  ", level);
  // const level = "beginner";

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    setTimeLeft(QUESTION_TIME);

    timerRef.current = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
  };

  useEffect(() => {
    // console.log("THis is level", level);

    let lvltype;

    if (level == "Beginner") {
      lvltype = "easy-questions";
    }

    if (level == "Intermediate") {
      lvltype = "medium-questions";
    }

    if (level == "Expert") {
      lvltype = "hard-questions";
    }

    const getQuestions = async () => {
      // console.log("I got called ser with level  ", level);
      setIsLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/users/get/${lvltype}`,
          { withCredentials: true }
        );

        // console.log("this is res ", res);
        // console.log("this is question ", questions);

        setquestions(res.data.QuestionBank);
        setIsLoading(false);
      } catch (error) {
        console.error("Error in getting questions");
      }
    };

    getQuestions();
  }, []);

  useEffect(() => {
    if ((level === "Expert" || level === "Intermediate") && selectedOption) {
      if (currentQuestionIndex == 9) {
        const getScore = async () => {
          setIsLoading(true);

          try {
            const response = await axios.post(
              `http://localhost:3000/api/v1/users/check/${
                level == "Expert" ? "hard" : "medium"
              }-questions-answers`,

              { data: answers, totalTimeLeft },{withCredentials:true}
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

  useEffect(() => {
    resetTimer();

    return () => clearInterval(timerRef.current);
  }, [currentQuestionIndex]);

  const handleTimeUp = () => handleOptionClick(null);

  const handleOptionClick = (option) => {
    // console.log("the handle option check function runs ");

    if (selectedOption !== null) return;

    clearInterval(timerRef.current);

    setTotalTimeLeft((prev) => prev + timeLeft);

    setTimeLeft(QUESTION_TIME);

    // console.log("This is state",questions[currentQuestionIndex]);

    setAnswers((prev) => [
      ...prev,

      {
        id: questions[currentQuestionIndex]?.id,

        question: questions[currentQuestionIndex].question,

        answer: option,
      },
    ]);

    if (level !== "Expert" || "Intermediate") {
      const isCorrect = option === questions[currentQuestionIndex].answer;

      if (isCorrect) setScore((prevScore) => prevScore + 1);
    }

    setSelectedOption(option || "timed-out");

    if (option === questions[currentQuestionIndex].answer) {
      // console.log("This is the option ", option);
      // console.log("This is the question ", questions[currentQuestionIndex]);
      // console.log(
      //   "This is the correct answer",
      //   questions[currentQuestionIndex].answer
      // );
      setScore((prev) => prev++);
      // console.log("one answer added");
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        // console.log("the index is incresed mate  ", currentQuestionIndex);
        // console.log("this is the question index mate ", questions.length - 1);

        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    // setCurrentQuestionIndex(0);

    // setScore(0);

    // setShowResult(false);

    // setSelectedOption(null);
    navigate("/select-lvl");
  };

  const getButtonClass = (option) => {
    if (!selectedOption) {
      return "border-white/20 hover:bg-white/10";
    }

    // console.log("this is level", level);

    if (level.includes("Expert") || level.includes("Intermediate")) {
      // console.log(" i am inside the if lvevle expert loop ", level);

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

    if (isCorrectAnswer) {
      //   console.log("the answer is correct ")

      return "bg-green-500/30 border-green-500/50 animate-pulse-correct";
    }
    if (option === selectedOption && !isCorrectAnswer)
      return "bg-red-500/30 border-red-500/50 animate-shake";

    return "border-white/20 cursor-not-allowed";
  };

  // const onGoToLeaderboard = () => {
  //   navigate
  // }

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
          Gathering the best questions for you...
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

  if (showResult) {
    return (
      <QuizResult
        score={score}
        totalQuestions={questions.length}
        onRestart={handleRestart}
        totalTimeLeft={totalTimeLeft}
        // onGoToLeaderboard={onGoToLeaderboard}
        // setCurrentView={setCurrentView}
        // onQuizComplete={onQuizComplete}
        level={level}
      />
    );
  }

  // useEffect(() => {}, [selectedOption]);

  const currentQuestion = questions?.[currentQuestionIndex];

  return (
    <div className="font-sans bg-black text-white min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* <ParticleBackground /> */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(40,_10,_80,_0.5),_transparent_50%)] z-0"></div>

      <div className="w-full max-w-2xl mx-auto z-10 space-y-4">
        {/* Timer Container */}
        <header className="bg-white/10 backdrop-blur-lg py-4 rounded-2xl shadow-2xl shadow-purple-500/10 border border-white/20">
          <div className="flex  justify-center gap-16  items-center">
            <div className="  text-sm font-bold text-amber-300">
              Score : {score}
            </div>

            <CircularTimer onTimeUp={handleTimeUp} timeLeft={timeLeft} />

            <div className="  text-sm font-bold text-white/70">
              {/* <div className="text-lg font-bold text-white bg-black/20 px-5 py-2 rounded-lg border border-white/20"> */}
              {currentQuestionIndex + 1}/10
            </div>
          </div>
        </header>

        {/* Main Quiz Container */}
        <main className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl shadow-purple-500/10 border border-white/20">
          <>
            <h2 className="text-2xl font-semibold mb-8 text-center text-gray-200">
              {currentQuestion?.question}
            </h2>

            {/* Options */}
            <div className="space-y-4">
              {currentQuestion?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  // disabled={isAnswered}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 text-lg flex justify-between items-center

                                            ${getButtonClass(option)}
                                           
                                        `}
                >
                  <span>
                    {/* <span className="font-bold mr-3">
                      {String.fromCharCode(65 + index)}.
                    </span> */}
                    {option}
                  </span>
                  {/* {isAnswered && option === selectedAnswer && (
                    <CheckIcon
                      className={`w-6 h-6 ${
                        option === currentQuestion.correctAnswer
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    />
                  )} */}

                  {level !== "Expert" ||
                    ("Intermediate" &&
                      selectedOption &&
                      option === questions[currentQuestionIndex].answer && (
                        <CheckIcon />
                      ))}

                  {level !== "Expert" ||
                    ("Intermediate" &&
                      selectedOption === option &&
                      option !== questions[currentQuestionIndex].answer && (
                        <XIcon />
                      ))}
                </button>
              ))}
            </div>
          </>
          {/* //   )} */}
        </main>
      </div>
    </div>
  );
}
