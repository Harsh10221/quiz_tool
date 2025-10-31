const ErrorIcon = () => (
  <svg
    className="w-16 h-16 text-red-500 mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.008v.008H12v-.008z"
    />
  </svg>
);

export default function ErrorComponent({
  title = "An Error Occurred",
  message = "Something went wrong. Please try again later.",
  onRetry,
  onCut,
}) {
  return (
    <div className="font-sans bg-black text-white min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* <ParticleBackground /> */}
      {/* Changed the rgba value for the radial gradient to be red */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(80,_10,_10,_0.5),_transparent_50%)] z-0"></div>

      {/* The main glassmorphism container for the error */}
      <main
        className="
        z-10 
        bg-white/10 backdrop-blur-lg 
        p-8 rounded-2xl 
        shadow-2xl shadow-red-500/10 
        border border-white/10 
        text-center 
        flex flex-col items-center 
        w-full max-w-md
      "
      >
        <ErrorIcon />
        {onCut ? (
          <div className="absolute right-5 top-5">
            <svg
            onClick={onCut}
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="#d1d5db"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        ) : null}

        <h2 className="text-3xl font-bold mt-4 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
          {title}
        </h2>

        <p className="text-lg text-gray-300 mb-10">{message}</p>

        {/* Conditionally render the "Try Again" button if a function is provided */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="
              bg-white/10 hover:bg-white/20 
              text-white font-bold 
              py-3 px-8 
              rounded-lg 
              transition-all duration-300 
              border border-white/20 
              flex items-center justify-center
            "
          >
            Try Again
          </button>
        )}
      </main>
    </div>
  );
}
