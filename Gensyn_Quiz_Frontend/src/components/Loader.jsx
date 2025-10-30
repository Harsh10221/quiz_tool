import React from "react";
// import Gensyn_logo from "/../assets/Gensyn_logo";

function Loader({width,height,animate=true}) {
  const colorToFill = "#fad7d1";

  return (
   <>
    {animate ?
      <style>
        {`
          /* A simple pulse: fades to active color and back */
          @keyframes pulse-loader {
            0%, 100% {
              fill: #000; /* Inactive (Black) */
            }
            50% {
              fill: #fad7d1; /* Active (Peak color) */
            }
          }

          /* We apply this one animation to all blocks */
          .svg-pulse-block {
            /* Runs the 'pulse-loader' over 1.5 seconds,
               'ease-in-out' makes the glow smoother than 'linear',
               'infinite' makes it loop.
            */
            animation: pulse-loader 3s ease-in-out infinite;
          }
        `}
      </style>
       : null
}
      <svg
        width={width || "90"}
        height={height || "90"}
        viewBox="0 0 89 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/*
          NOTICE: All <rect> elements have the EXACT SAME class.
          There are no more 'delay' classes.
        */}
        <rect
          x="24"
          width="42"
          height="10"
          className="svg-pulse-block"
          fill={animate ? "#000" : "#fad7d1" } 
        />
        <rect
          x="15"
          y="9"
          width="10"
          height="10"
          className="svg-pulse-block"
          fill={animate ? "#000" : "#fad7d1" } 
        />
        <rect
          x="71"
          y="63"
          width="10"
          height="10"
          className="svg-pulse-block"
          fill={animate ? "#000" : "#fad7d1" } 
        />
        <rect
          width="10"
          height="10"
          transform="matrix(-1 0 0 1 18 65)"
          className="svg-pulse-block"
          fill={animate ? "#000" : "#fad7d1" } 
        />
        <rect
          width="10"
          height="10"
          transform="matrix(-1 0 0 1 74 7)"
          className="svg-pulse-block"
          fill={animate ? "#000" : "#fad7d1" } 
        />
        <rect
          x="7"
          y="17"
          width="10"
          height="10"
          className="svg-pulse-block"
          fill={animate ? "#000" : "#fad7d1" } 
        />
        <rect
          x="63"
          y="71"
          width="10"
          height="10"
          className="svg-pulse-block"
          fill={animate ? "#000" : "#fad7d1" } 
        />
        <rect
          width="10"
          height="10"
          transform="matrix(-1 0 0 1 26 73)"
          className="svg-pulse-block"
          fill={animate ? "#000" : "#fad7d1" } 
        />
        <rect
          width="10"
          height="10"
          transform="matrix(-1 0 0 1 82 15)"
          className="svg-pulse-block"
          fill={animate ? "#000" : "#fad7d1" } 
        />
        <rect
          x="10"
          y="25"
          width="42"
          height="10"
          transform="rotate(89.9271 10 25)"
          className="svg-pulse-block"
          fill={animate ? "#000" : "#fad7d1" } 
        />
        <rect
          width="42"
          height="10"
          transform="matrix(-0.00127312 0.999999 0.999999 0.00127312 79 23)"
          className="svg-pulse-block"
          fill={animate ? "#000" : "#fad7d1" } 
        />
        <rect
          x="24"
          y="80"
          width="42"
          height="10"
          className="svg-pulse-block"
          fill={animate ? "#000" : "#fad7d1" } 
        />
      </svg>
    </>
  );
}

export default Loader;
