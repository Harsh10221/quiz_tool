
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Leaderboard from "./components/Leaderboard.jsx";
import Quiz from "./components/Quiz.jsx";
import LandingPage from "./components/LandingPage";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
// import TransitionLayout from "./components/TransitionLayout.jsx";
import TransitionOverlay from "./components/TransitionOverlay.jsx";
import SelectQuizLvl from "./quiz/components/SelectQuizLvl.jsx";
import axios from "axios";

export default function App() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [btnPosition, setBtnPosition] = useState(null);
  const [targetPath, setTargetPath] = useState(null);
  const [userDetails, setuserDetails] = useState(null)
  const [highestCompletedLevel, setHighestCompletedLevel] = useState("Beginner");

useEffect(() => {
  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/users/get/user-details",
        { withCredentials: true } // Sends the cookie
      );
      
      // --- SUCCESS ---
      // Only update if the request was successful (implied by no error)
      const user = response.data.user;
      // console.log("User details fetched:", user);
      
      localStorage.setItem("userData", JSON.stringify(user)); // Update localStorage
      setuserDetails(user); // Update React state (assuming you have a useState for the user)
      setHighestCompletedLevel(  user.userLevel || "Beginner" ); // Update level state

    } catch (error) {
      // --- FAILURE ---
      // If the request fails (e.g., 401 Unauthorized because cookie is invalid/missing), clear everything.
      console.error("Failed to fetch user details (likely not logged in):", error.response?.data?.message || error.message);
      
      localStorage.removeItem("userData"); // Clear localStorage
      setuserDetails(null); // Clear user state
      // setHighestCompletedLevel("None"); // Reset level state
    }
  };

  getUserDetails();
}, []); // Runs once on initial load

  const getPosition = (obj) => {
    setBtnPosition(obj);
  };

  const handleNavigate = (path, ref) => {
    setBtnPosition(ref.current.getBoundingClientRect());
    if (isTransitioning) return;
    setTargetPath(path);
    setIsTransitioning(true);
  };

  const onWipeComplete = () => {
    navigate(targetPath);
    setIsTransitioning(false);
  };

  // const handleNavigateToQuiz = () => {
  //   navigate("/quiz");
  // };

  const onDifficultySelect = (lvl) => {
    console.log("this lvl is ", lvl);
    navigate("/quiz",{
      state:{level:lvl}
    });
  };

  return (
    <div className="bg-black h-screen w-screen relative overflow-y-auto">
      <Routes>

        <Route
          path="/"
          element={
            <LandingPage
              userData = {userDetails}
              setuserDetails={setuserDetails}
              getPosition={getPosition}
              onNavigate={handleNavigate}
            />
          }
        />

        <Route path="/quiz" element={<Quiz />} />

        <Route
          path="/select-lvl"
          element={
            <SelectQuizLvl
            
              // onSelect={handleNavigateToQuiz}
              highestCompletedLevel={highestCompletedLevel}
              onDifficultySelect={onDifficultySelect}
            />
          }
        />

        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>

      <AnimatePresence>
        {isTransitioning && (
          <TransitionOverlay
            btnPosition={btnPosition}
            onComplete={onWipeComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
