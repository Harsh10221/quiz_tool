import React, { useEffect, useState } from "react";
import { TrophyIcon, RestartIcon, ShareIcon } from "./Icons.jsx";
import axios from "axios";
import Loader from "./Loader.jsx";
import ErrorComponent from "../quiz/components/ErrorComponent.jsx";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [guestLoginError, setguestLoginError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const [view, setView] = useState("choice");

  const DiscordIcon = () => (
    <svg
      viewBox="0 0 33.87 33.87"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={`w-8 h-8 `}
    >
      <path
        d="m11.34 5.18c-1.08 0-4.32 1.32-4.9 1.58-.58.26-1.23 1.08-1.96 2.44-.73 1.36-1.32 2.94-2.27 5.27-.95 2.33-1.18 6.82-1.15 8.19.03 1.37.19 2.44 1.59 3.25 1.4.81 2.65 1.66 3.95 2.17 1.31.51 2.2.88 2.81.37.61-.51 1-1.4 1-1.4s.57-.8-.51-1.28c-1.08-.48-1.63-.81-1.58-1.31.05-.49.13-.76.4-.7.27.06.91 1.21 3.36 1.74 2.46.53 4.85.45 4.85.45s2.39.08 4.85-.45c2.46-.53 3.09-1.67 3.36-1.74.27-.06.35.21.4.7.05.49-.49.83-1.58 1.31-1.08.48-.51 1.28-.51 1.28s.4.89 1 1.4c.61.51 1.5.14 2.81-.37 1.31-.51 2.55-1.36 3.95-2.17 1.4-.81 1.56-1.88 1.59-3.25.03-1.37-.19-5.86-1.15-8.19-.96-2.33-1.55-3.91-2.28-5.27-.73-1.36-1.38-2.18-1.96-2.44-.58-.26-3.83-1.58-4.9-1.58-1.08 0-1.39.75-1.39.75l-.38.83s-2.52-.48-3.8-.48c-1.28 0-3.84.48-3.84.48l-.37-.83s-.32-.75-1.39-.75zm.12 9.95c1.57 0 2.84 1.37 2.84 3.07s-1.27 3.07-2.84 3.07-2.84-1.37-2.84-3.07 1.25-3.04 2.8-3.07zm10.91 0c1.55.02 2.8 1.39 2.8 3.07 0 1.69-1.27 3.07-2.84 3.07s-2.84-1.37-2.84-3.07c0-1.69 1.27-3.07 2.84-3.07z"
        fill="#00a1ff"
      />
    </svg>
  );

  const UserIcon = () => (
    <svg
      className="w-5 h-5 mr-3"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );

  const CloseIcon = () => (
    <svg
      className="w-6 h-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const BackIcon = () => (
    <svg
      className="w-5 h-5 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );

  const handleGuestSubmit = async (e) => {
    e.preventDefault();
    // if (username.trim()) {
    //   console.log(username, avatarUrl);
    //   // onPostAsGuest(username, avatarUrl);
    // }
    try {
      setIsLoading(true);
      await axios.post(
        "http://localhost:3000/api/v1/users/guest-login",
        {
          username,
          avatarUrl,
        },
        { withCredentials: true }
      );

      setIsLoading(false);
      navigate("/select-lvl");
    } catch (error) {
      setIsLoading(false);
      setErrorMsg(error.response.data.message);
      setguestLoginError(true);
      console.error("Error while login as guest", error);
    }
  };

  useEffect(() => {
    if (onQuizComplete) {
      onQuizComplete(level, score, totalQuestions);
    }
  }, []);

  const handleAddDateToLeaderboardNewUser = async () => {
    setIsAuthVisible(true);
    // window.location.href =
    //   "https://quiz-backend-zyav.onrender.com/api/v1/users/auth/discord";
    // window.location.href = "http://localhost:3000/api/v1/users/auth/discord";
  };
  // const handleAddDateToLeaderboardNewUser = async () => {
  //   window.location.href =
  //     "https://quiz-backend-zyav.onrender.com/api/v1/users/auth/discord";
  //   // window.location.href = "http://localhost:3000/api/v1/users/auth/discord";
  // };

  const handleAddDateToLeaderboard = async () => {
    console.log("you clicked on handle add to leadeboard");
    setIsAuthVisible(true);
  };
  // const handleAddDateToLeaderboard = async () => {
  //   setIsLoading(true)
  //   try {
  //     const res = await axios.post(
  //       "https://quiz-backend-zyav.onrender.com/api/v1/users/update-score",
  //       // "http://localhost:3000/api/v1/users/update-score",
  //       {
  //         score,
  //         level,
  //         totalTimeLeft,
  //       },
  //       { withCredentials: true }
  //     );
  //     setIsLoading(false)

  //     // console.log("This is responne ", res);
  //   } catch (error) {
  //     setIsError(true)
  //     setErrorMsg(error.message)
  //     console.error("Error while adding data", error);
  //   }
  // };

  const onPostWithDiscordNewUser = async () => {
    // console.log("auth with discord ");
    // window.location.href =
    //   "https://quiz-backend-zyav.onrender.com/api/v1/users/auth/discord";
    window.location.href = "http://localhost:3000/api/v1/users/auth/discord";
  };

  const onPostWithDiscordCanBeOldUser = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        // "https://quiz-backend-zyav.onrender.com/api/v1/users/update-score",
        "http://localhost:3000/api/v1/users/update-score",
        {
          score,
          level,
          totalTimeLeft,
        },
        { withCredentials: true }
      );
      setIsLoading(false);
      navigate("/select-lvl");

      // console.log("This is responne ", res);
    } catch (error) {
      setIsError(true);
      setErrorMsg(error.message);
      console.error("Error while adding data", error);
    }
  };

  const handleDismissErrorComponent = () => {
    navigate("/select-lvl");
  };

  const handleDismissErrorOnGuestError = () => {
    setguestLoginError(false);
  };

  const onClose = () => {
    console.log("close clicked ");
    setIsAuthVisible(false);
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
        onRetry={() => {
          setIsError(false), onPostWithDiscordCanBeOldUser();
        }}
        message={errorMsg}
        onCut={handleDismissErrorComponent}
      />
    );
  }

  if (guestLoginError) {
    return (
      <ErrorComponent
        // onCut={handleDismissError}
        // onRetry={() => {
        //   setIsError(false), onPostWithDiscordCanBeOldUser();
        // }}
        message={errorMsg}
        onCut={handleDismissErrorOnGuestError}
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

  if (isAuthVisible) {
    return (
      <div className="font-sans text-white min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background elements */}
        {/* <ParticleBackground /> */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(40,_10,_80,_0.5),_transparent_50%)] z-0"></div>

        {/* Modal Container */}
        <div className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl shadow-purple-500/10 border border-white/20 w-full max-w-md">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <CloseIcon />
          </button>

          <h2 className="relative text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-500 to-cyan-800 bg-[length:200%_auto] animate-[shine_4s_linear_infinite]">
            Post Your Score
          </h2>

          {/* View 1: The Initial Choice (Mobile-First) */}
          {/* // This is the content for your `view === 'choice'` */}
          {view === "choice" && (
            <div className="flex flex-col gap-4">
              <p className="text-center text-gray-300 mb-4">
                Choose how you want to appear on the leaderboard.
              </p>

              {/* --- Option 1: Post with Discord (with "Recommended" badge) --- */}
              <div className="relative">
                {userDetails ? (
                  <button
                    onClick={onPostWithDiscordCanBeOldUser}
                    className="
          w-full flex items-center justify-center 
          font-bold text-white 
          py-3 px-6 rounded-lg 
          transition-all duration-200 
          
          bg-blue-600/30
          backdrop-blur-md
          border border-blue-400
          shadow-lg shadow-blue-500/20
          
          active:scale-95
          active:bg-blue-600/40
        "
                  >
                    {/* <DiscordIcon />
                    Post with Discord (Verified) */}
                  </button>
                ) : (
                  <button
                    onClick={onPostWithDiscordNewUser}
                    className="
          w-full flex items-center justify-center 
          font-bold text-white 
          py-3 px-6 rounded-lg 
          transition-all duration-200 
          
          bg-blue-600/30
          backdrop-blur-md
          border border-blue-400
          shadow-lg shadow-blue-500/20
          
          active:scale-95
          active:bg-blue-600/40
        "
                  >
                    <DiscordIcon />
                    Post with Discord (Verified)
                  </button>
                )}

                {/* --- THE NEW "RECOMMENDED" BADGE --- */}

                <span
                  className="
        absolute -top-3 left-1/2 -translate-x-1/2
        bg-gradient-to-r from-purple-600 to-pink-600 
        text-xs font-bold 
        px-3 py-0.5 
        rounded-full
      "
                >
                  Recommended
                </span>
              </div>

              {/* --- THE NEW DISCLAIMER --- */}
              <p className="text-xs text-gray-400 text-center -mt-2 px-2 italic">
                We only read your public username and avatar. We never get
                access to your messages or private info.
              </p>

              {/* --- Option 2: Post as Guest (with Disclaimer) --- */}
              <div className="flex flex-col mt-4">
                {" "}
                {/* Added margin-top */}
                <button
                  onClick={() => setView("guestForm")}
                  className="
          w-full flex items-center justify-center 
          font-bold text-white 
          py-3 px-6 rounded-lg 
          transition-all duration-200 
          
          bg-white/10           
          backdrop-blur-md     
          border border-white/20 
          shadow-lg shadow-black/20
          
          active:scale-95        
          active:bg-white/20     
        "
                >
                  <UserIcon />
                  Post as Guest
                </button>
                <p className="text-xs text-gray-400 text-center mt-3 px-2 italic">
                  Guest scores are tied to this browser. Clearing your cache or
                  logging out will lose them permanently.
                </p>
              </div>
            </div>
          )}

          {/* View 2: The Guest Form */}
          {view === "guestForm" && (
            <form onSubmit={handleGuestSubmit} className="flex flex-col">
              {/* --- Inputs (Unchanged, already good) --- */}
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Username (required)
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="SpeedyRunner"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="avatarUrl"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Avatar URL (optional)
                </label>
                <input
                  type="text"
                  id="avatarUrl"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="https://your.image/url.png"
                />
              </div>

              {/* --- Improved Button Container --- */}
              {/* Stacks vertically on mobile, reverses row on desktop */}
              <div className="flex flex-col-reverse sm:flex-row-reverse sm:items-center gap-4 mt-2">
                {/* 1. Primary Action: Submit (Now has visual priority) */}
                <button
                  type="submit"
                  className="
  w-full sm:flex-1 flex items-center justify-center
  font-bold text-white
  py-3 px-6 rounded-lg
  transition-all duration-200

  bg-gradient-to-r from-indigo-700 to-purple-800
  hover:from-indigo-800 hover:to-purple-900
  border border-purple-500/20
  shadow-sm shadow-purple-700/10

  active:scale-95
"
                >
                  <UserIcon />
                  Submit Guest Score
                </button>

                {/* 2. Secondary Action: Back (Now themed correctly) */}
                <button
                  type="button"
                  onClick={() => setView("choice")}
                  className="
          w-full sm:w-auto flex items-center justify-center 
          font-bold text-white 
          py-3 px-6 rounded-lg 
          transition-all duration-200 
          
          bg-white/10 backdrop-blur-md 
          border border-white/20 
          hover:bg-white/20
          shadow-lg shadow-black/20
          
          active:scale-95
        "
                >
                  <BackIcon />
                  Back
                </button>
              </div>
            </form>
          )}
        </div>
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
                onClick={onPostWithDiscordCanBeOldUser}
                // onClick={handleAddDateToLeaderboard}
                className="bg-gradient-to-r from-purple-500 via-yellow-400 to-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:brightness-110 transition-all"

                // className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Add score to leaderboard
              </button>

            ) : (

              <button
                onClick={() => setIsAuthVisible(true)}
                // onClick={onPostWithDiscordNewUser}
                // onClick={handleAddDateToLeaderboardNewUser}
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
