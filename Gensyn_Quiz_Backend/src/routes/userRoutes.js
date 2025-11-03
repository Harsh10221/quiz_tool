import express from "express";
import {
  handleCallBackFromDiscord,
  handlediscordAuth,
  handleEasyQuestion,
  handleGuestLogin,
  handleHardAnswerCheck,
  handleHardQuestion,
  handleLeaderboardData,
  handleLogout,
  handleMediumeAnswerCheck,
  handleMediumQuestion,
  handleUpdateScore,
  handleUserDetails,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/auth/discord", handlediscordAuth);
router.post("/guest-login", handleGuestLogin);
router.get("/auth/discord/callback", handleCallBackFromDiscord);
router.post("/logout",verifyJwt,handleLogout);
router.get("/get/user-details",verifyJwt,handleUserDetails);


router.get("/get/leaderboard-data",handleLeaderboardData);

router.post("/update-score",verifyJwt,handleUpdateScore);

// router.get("/get/easy-questions",verifyJwt,handleEasyQuestion);
router.get("/get/easy-questions",handleEasyQuestion);

router.get("/get/medium-questions",verifyJwt, handleMediumQuestion);
router.post("/check/medium-questions-answers",verifyJwt ,handleMediumeAnswerCheck);

router.get("/get/hard-questions",verifyJwt, handleHardQuestion);
router.post("/check/hard-questions-answers",verifyJwt, handleHardAnswerCheck);


export default router;
