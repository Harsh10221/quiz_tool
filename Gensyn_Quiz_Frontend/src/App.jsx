// // In your App.jsx or any other page

// "use client"; // Make sure this is at the top if you're using Next.js

// import { useEffect, useState } from "react";
// import { useTheme } from "next-themes"; // This requires "npm install next-themes"

// // This path must match where you created your file in Step 3
// import { Particles } from "./components/Particles";

// export default function MyPage() {
//   // Renamed to a standard component name
//   const { resolvedTheme } = useTheme();
//   const [color, setColor] = useState("#ffffff");

//   useEffect(() => {
//     // This logic sets the particle color based on your site's dark/light mode
//     setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
//   }, [resolvedTheme]);

//   return (
//     <div className="bg-background  relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
//       <span className="pointer-events-none z-10 text-center text-8xl font-semibold leading-none whitespace-pre-wrap">
//         Particles
//       </span>
//       <Particles
//         className="absolute inset-0 z-0" // This class is important
//         quantity={100}
//         ease={80}
//         color={color}
//         refresh
//       />
//     </div>
//   );
// }

// import { RippleButton } from "@/components/ui/ripple-button"

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

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import ComponentA from "./components/ComponentA"; // Adjust path if needed
// import ComponentB from "./components/ComponentB"; // Adjust path if needed

// // Animation settings for the expanding/shrinking circle
// const transitionVariants = {
//   initial: {
//     scale: 0,
//     x: "50vw", // Start from center (adjust if button is elsewhere)
//     y: "50vh", // Start from center (adjust if button is elsewhere)
//     borderRadius: "50%",
//   },
//   animate: {
//     scale: 50, // Scale large enough to cover the screen
//     transition: {
//       duration: 0.8,
//       ease: [0.87, 0, 0.13, 1], // A nice sharp ease
//     },
//   },
//   exit: {
//     scale: 0,
//     transition: {
//       duration: 0.8,
//       ease: [0.87, 0, 0.13, 1],
//       delay: 0.3, // Wait a moment before shrinking
//     },
//   },
// };

// export default function App() {
//   // State to track which view is active
//   const [currentView, setCurrentView] = useState("A");

//   // State to control the transition overlay
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   // This is the new background color for the transition
//   const transitionColor = currentView === "A" ? "#000" : "#FFF"; // Black or White

//   const handleNavigate = () => {
//     // 1. Show the transition overlay
//     setIsTransitioning(true);
//   };

//   const onAnimationComplete = () => {
//     // 2. When the overlay is AT FULL SIZE, swap the components
//     setCurrentView(currentView === "A" ? "B" : "A");

//     // 3. Hide the overlay (which triggers the "exit" animation)
//     setIsTransitioning(false);
//   };

//   return (
//     <div style={{ position: "relative", overflow: "hidden" }}>
//       {/* This component shows the expanding/shrinking circle */}
//       <AnimatePresence>
//         {isTransitioning && (
//           <motion.div
//             className="fixed z-50" // Sits on top of everything
//             style={{
//               width: "100px",
//               height: "100px",
//               backgroundColor: transitionColor
//             }}
//             variants={transitionVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             onAnimationComplete={onAnimationComplete}
//           />
//         )}
//       </AnimatePresence>

//       {/* This renders your actual page content */}
//       {currentView === "A" ? (
//         <ComponentA onNavigate={handleNavigate} />
//       ) : (
//         <ComponentB onNavigate={handleNavigate} />
//       )}
//     </div>
//   );
// }
