import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import Loader from "./components/Loader.jsx";
import { BrowserRouter } from "react-router-dom";
import TestApp from "./components/TestApp.jsx";
import QuizResult from "./components/QuizResult.jsx";
import ErrorComponent from "./quiz/components/ErrorComponent.jsx";

// import PixelBlast from './components/Background.jsx';

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <App />
    {/* <QuizResult/> */}
    {/* <TestApp/> */}
    {/* <ErrorComponent message={"Db not responding"} onRetry={true} /> */}
  </BrowserRouter>

  // {/* <TestApp/> */}
  // {/* </StrictMode>, */}
);
