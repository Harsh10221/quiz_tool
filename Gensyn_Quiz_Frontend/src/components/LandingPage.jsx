"use client";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Particles } from "./Particles";
// import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LandingPage({ userData, setuserDetails, onNavigate, getPosition }) {
  const [currentView, setCurrentView] = useState("A");

  // console.log("this is uerdata",userData)

  const navigate = useNavigate();
  const btnRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [guestLoginOptionVisible, setguestLoginOptionVisible] = useState(false);
  const transitionColor = currentView === "A" ? "#000" : "#FFF"; // Black or White
  const btnPosition = btnRef.current?.getBoundingClientRect();

  useEffect(() => {
    getPosition(btnPosition);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://quiz-backend-zyav.onrender.com/api/v1/users/logout",
        // "http://localhost:3000/api/v1/users/logout",
        {},
        {
          withCredentials: true,
        }
      );

      setuserDetails(null);
    } catch (error) {
      console.error("Error during backend logout:", error);
    } finally {
      localStorage.removeItem("userData");
    }
  };

  const showGuestLoginOptions = () => {
    setguestLoginOptionVisible((prev) => !prev);
  };

  console.log("This is btn proprites ", btnPosition?.y);

  return (
    <div className="bg-black relative flex h-screen w-screen  flex-col items-center justify-center overflow-hidden  border">
      <div
        className="
 w-4/5 flex  absolute top-5 gap-5 items-center justify-between
    bg-white/15 backdrop-blur-2xl
    py-3 px-6 rounded-3xl
    border border-white/20
    text-[#c2bebe] text-sm font-sans
   
    "
        // style="box-shadow: 0 0 40px 5px rgba(255, 255, 255, 0.2);"
      >
        <div className="flex w-full  items-center  gap-5">
          <div>
            {/* Discord */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M20.317,4.37c-1.53-0.702-3.17-1.219-4.885-1.515c-0.031-0.006-0.062,0.009-0.079,0.037   
    c-0.211,0.375-0.445,0.865-0.608,1.249c-1.845-0.276-3.68-0.276-5.487,0C9.095,3.748,8.852,3.267,8.641,2.892   
    C8.624,2.864,8.593,2.85,8.562,2.855C6.848,3.15,5.208,3.667,3.677,4.37C3.664,4.375,3.652,4.385,3.645,4.397   
    c-3.111,4.648-3.964,9.182-3.546,13.66c0.002,0.022,0.014,0.043,0.031,0.056c2.053,1.508,4.041,2.423,5.993,3.029   
    c0.031,0.01,0.064-0.002,0.084-0.028c0.462-0.63,0.873-1.295,1.226-1.994c0.021-0.041,0.001-0.09-0.042-0.106   
    c-0.653-0.248-1.274-0.55-1.872-0.892c-0.047-0.028-0.051-0.095-0.008-0.128c0.126-0.094,0.252-0.192,0.372-0.291   
    c0.022-0.018,0.052-0.022,0.078-0.01c3.928,1.793,8.18,1.793,12.061,0c0.026-0.012,0.056-0.009,0.079,0.01   
    c0.12,0.099,0.246,0.198,0.373,0.292c0.044,0.032,0.041,0.1-0.007,0.128c-0.598,0.349-1.219,0.645-1.873,0.891   
    c-0.043,0.016-0.061,0.066-0.041,0.107c0.36,0.698,0.772,1.363,1.225,1.993c0.019,0.027,0.053,0.038,0.084,0.029   
    c1.961-0.607,3.95-1.522,6.002-3.029c0.018-0.013,0.029-0.033,0.031-0.055c0.5-5.177-0.838-9.674-3.548-13.66   
    C20.342,4.385,20.33,4.375,20.317,4.37z"
              />
              <path
                d="M8.02,15.331c-1.183,0-2.157-1.086-2.157-2.419s0.955-2.419,2.157-2.419
    c1.211,0,2.176,1.095,2.157,2.419C10.177,14.246,9.221,15.331,8.02,15.331z"
              />
              <path
                d="M15.995,15.331c-1.182,0-2.157-1.086-2.157-2.419s0.955-2.419,2.157-2.419
    c1.211,0,2.176,1.095,2.157,2.419C18.152,14.246,17.206,15.331,15.995,15.331z"
              />
            </svg>
          </div>

          <div>
            {/* x */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  
    l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  
    l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z"
              />
            </svg>
          </div>

          <div>
            {/* docs */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="20"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.5,5.5V22A1.5,1.5,0,0,1,19,23.5H5A1.5,1.5,0,0,1,3.5,22V2A1.5,1.5,0,0,1,5,.5H15.5Z" />
              <path d="M15.5.5V4A1.5,1.5,0,0,0,17,5.5h3.5" />
              <line x1="7.5" y1="11.5" x2="16.5" y2="11.5" />
              <line x1="7.5" y1="13.5" x2="16.5" y2="13.5" />
              <line x1="7.5" y1="15.5" x2="16.5" y2="15.5" />
              <line x1="7.5" y1="17.5" x2="12.5" y2="17.5" />
            </svg>
          </div>
        </div>
        {userData ? (
          userData?.isGuest ? (
            <div className="relative">
              <button
              onClick={showGuestLoginOptions}
                className="text-white bg-yellow-500 w-auto text-center font-medium 
               rounded-2xl py-1.5 px-4 shadow-md
               transition-transform duration-150 ease-in-out
               active:scale-95"
              >
                Guest Profile
              </button>
              {guestLoginOptionVisible && (
                <div
                  className="absolute right-0 mt-2 w-44 
               flex flex-col gap-2 p-2
               bg-white/10 backdrop-blur-lg
               rounded-2xl border border-white/20
               shadow-xl"
                >
                  <button
                  onClick={() =>
                (window.location.href =
                  "https://quiz-backend-zyav.onrender.com/api/v1/users/auth/discord")
                  // "http://localhost:3000/api/v1/users/auth/discord")
              }
                    className="text-white bg-blue-500 w-full text-center 
                 font-medium rounded-xl py-2 px-4 
                 transition-filter duration-100 ease-in-out
                 active:brightness-90"
                  >
                    Verify Dc
                  </button>

                  {/* --- Logout Button --- */}
                  <button
                  onClick={handleLogout}
                    className="text-black bg-white w-full text-center 
                 font-medium rounded-xl py-2 px-4
                 transition-filter duration-100 ease-in-out
                 active:brightness-90"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // <button
            //   // onClick={handleLogout}

            //   onClick={() =>
            //     (window.location.href =
            //       // "https://quiz-backend-zyav.onrender.com/api/v1/users/auth/discord")
            //       "http://localhost:3000/api/v1/users/auth/discord")
            //   }
            //   className="text-white bg-blue-500 w-40 text-center font-figtree font-medium  rounded-2xl py-1.5 px-4 "
            // >
            //   Verify Dc
            // </button>

            <button
              onClick={handleLogout}
              className="text-black bg-white font-figtree font-medium  rounded-2xl py-1.5 px-4 "
            >
              Logout
            </button>
          )
        ) : (
          <button
            onClick={
              () =>
                (window.location.href =
                  "https://quiz-backend-zyav.onrender.com/api/v1/users/auth/discord")
              // "http://localhost:3000/api/v1/users/auth/discord")
            }
            className="text-black  bg-white font-figtree font-medium  rounded-2xl py-1.5 px-4 "
          >
            {/* <button class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300"> */}
            login
          </button>
        )}
      </div>

      <div
        className="font-figtree  pointer-events-none z-10 text-center text-2xl font-semibold leading-none whitespace-pre-wrap 
      text-white"
      >
        Turn your knowledge into confidence
      </div>

      <div className="mt-8">
        <button
          ref={btnRef}
          onClick={(e) => {
            onNavigate("/select-lvl", btnRef);
            // onNavigate("/quiz", btnRef);
          }}
          type="button"
          className="text-black mr-5 bg-white font-figtree font-medium  rounded-3xl py-2 px-4 "
        >
          {" "}
          Let's begin
        </button>
        <Link to="/leaderboard">
          <button
            type="button"
            className="text-[#c2bebe] bg-white/10 font-figtree   backdrop-blur-lg  py-2 px-4 rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/20 text-center  "
          >
            Leaderboard
          </button>
        </Link>
      </div>

      <div className="text-[#bababa]  font-figtree text-xs absolute bottom-3  backdrop-blur-lg  py-2 px-4 rounded-3xl shadow-2xl shadow-purple-500/10 text-center  ">
        This quiz is created by the community and is not an official assessment.
      </div>

      <Particles
        className="absolute inset-0 z-0"
        quantity={200}
        ease={50}
        // color="#E6E6FA"
        color="#ffffff"
        refresh
      />
    </div>
  );
}

export default LandingPage;
