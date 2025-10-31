import React, { useEffect, useState } from "react";
import { TrophyIcon, RestartIcon, ShareIcon } from "./Icons.jsx";
import axios from "axios";
import Loader from "./Loader.jsx";
import ErrorComponent from "../quiz/components/ErrorComponent.jsx";

export default function QuizResult({
  setCurrentView,
  score,
  totalQuestions,
  onRestart,
  onGoToLeaderboard,
  onQuizComplete,
  level,
  totalTimeLeft,
}) {

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (onQuizComplete) {
      onQuizComplete(level, score, totalQuestions);
    }
  }, []);

  const handleAddDateToLeaderboardNewUser = async () => {
    window.location.href = "http://localhost:3000/api/v1/users/auth/discord";
  };

  const handleAddDateToLeaderboard = async () => {
    setIsLoading(true)
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/update-score",
        {
          score,
          level,
          totalTimeLeft,
        },
        { withCredentials: true }
      );
      setIsLoading(false)
      
      // console.log("This is responne ", res);
    } catch (error) {
      setIsError(true)
      setErrorMsg(error.message)
      console.error("Error while adding data", error);
    }
  };


  const userDetails = localStorage?.getItem("userData");

  // console.log("this is userdata from quiz result ",userDetails)

  //   const tweetText = `🏆 Just crushed this quiz with a score of ${score}/${total}! Think you can beat me? 😎 Try it here: ${siteUrl} #QuizChallenge #FunQuiz`;
  // const tweetText = `🔥 I scored ${score}/${total} on this mind-twisting quiz! Bet you can't top that 😏 Take the challenge at ${siteUrl} #QuizMaster #ChallengeAccepted`;
  // const tweetText = `🤔 Just tested my brain and scored ${score}/${total}! How well do you know your stuff? Take the quiz at ${siteUrl} 🧠 #QuizTime #BrainChallenge`;
  // const tweetText = `🎉 I finished the quiz and scored ${score}/${total}! It’s more fun than you think — come try it 👉 ${siteUrl} 🏆 #QuizFun #ShareYourScore`;
  // const tweetText = `✨ Scored ${score}/${total} — feeling like a quiz legend right now 🏆 Think you can outscore me? Take the quiz: ${siteUrl} #QuizLegend #Challenge`;

  // const tweetText = `🔥 I scored ${score}/${total} on this fun quiz! Think you can beat me? 😏 Try it here: ${siteUrl} 🏆 #QuizChallenge #FunQuiz`;

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

   if (isError) {
    return (
      <ErrorComponent
        // onCut={handleDismissError}
        onRetry={() => setIsError(false)}
        message={errorMsg}
      />
    );
  }

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
          {/* Gathering the best questions for you... */}
          Secure channel established. Fetching data...
          {/* Syncing with question database...
          Compiling the question bank...
          Please wait while we calibrate the difficulty.
          Verifying question bank checksum...
          Building secure assessment environment...
          // Secure channel established. Fetching data... */}
        </p>
      </div>
    );
  }

  return (
    <div className="font-sans bg-black text-white min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* <ParticleBackground /> */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(40,_10,_80,_0.5),_transparent_50%)] z-0"></div>

      <main className="z-10 bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl shadow-purple-500/10 border border-white/20 text-center flex flex-col items-center w-full max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#FFD700"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#DAA520"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
          />
        </svg>

        {/* <h2 className="text-3xl font-bold mt-4 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"> */}
        <h2 className="bg-gradient-to-r text-3xl mt-4 mb-2 font-bold from-purple-500 via-yellow-400 to-orange-500 text-transparent bg-clip-text">
          Quiz Finished!
        </h2>

        <p className="text-lg text-gray-300 mb-6">Your final score is:</p>

        <p className="text-5xl sm:text-6xl font-bold mb-6 text-white">
          {score}
          <span className="text-xl sm:text-2xl text-gray-400">
            {" "}
            / {totalQuestions}
          </span>
        </p>

        <p className="text-lg text-indigo-300 mb-10 italic">
          "{performanceQuote}"
        </p>

        <div className="flex flex-col gap-4 w-full">
          {/* Button layout from your old code */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onRestart}
              className="flex-1 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold text-lg py-3 rounded-xl transition-all duration-300 transform hover:scale-105 border border-white/20"
            >
              <RestartIcon /> Try Again
            </button>

            {userDetails ? (
              <button
                onClick={handleAddDateToLeaderboard}
                className="bg-gradient-to-r from-purple-500 via-yellow-400 to-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:brightness-110 transition-all"

                // className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Add score to leaderboard
              </button>
            ) : (
              <button
                onClick={handleAddDateToLeaderboardNewUser}
                className="bg-gradient-to-r from-purple-500 via-yellow-400 to-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:brightness-110 transition-all"

                // className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Add score to leaderboard
              </button>
            )}
          </div>

          {/* Post to X button (as an <a> tag) */}
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-black/50 hover:bg-black/80 text-white font-bold text-lg py-3 rounded-xl transition-all duration-300 transform hover:scale-105 border border-white/20"
          >
            <ShareIcon /> Post to X
          </a>
        </div>
      </main>
    </div>
  );
}
