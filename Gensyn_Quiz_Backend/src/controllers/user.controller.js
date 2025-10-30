import axios from "axios";
// import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken";
import { easyQuestionBank } from "../services/easy_questions_bank.js";
import { mediumQuestionBank } from "../services/medium_questions_bank.js";
import { hardQuestionBank } from "../services/hard_questions_bank.js";
import User from "../models/user.model.js";
import Leaderboard from "../models/leaderboard.model.js";

// console.log(`[Controller File] Module Execution: ${process.env.DISCORD_CLIENT_ID}`);

// const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
// const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = `http://localhost:3000/api/v1/users/auth/discord/callback`;

// console.log("i am outside of the functions  ",process.env.DISCORD_CLIENT_ID,process.env.DISCORD_CLIENT_SECRET)
const handlediscordAuth = async (req, res) => {
  // console.log("i am runned ",process.env.DISCORD_CLIENT_ID,process.env.DISCORD_CLIENT_SECRET)

  const url = `https://discord.com/api/oauth2/authorize?client_id=${
    process.env.DISCORD_CLIENT_ID
  }&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code&scope=identify`;
  res.redirect(url);
};

const handleCallBackFromDiscord = async (req, res) => {
  // console.log("i am runned rom handle callback ")
  // app.get('/auth/discord/callback', async (req, res) => {
  const { code } = req.query;
  // console.log("This is code",code)

  if (!code) {
    return res.status(400).send("Authorization code is missing.");
  }

  try {
    // Exchange code for an access token
    const tokenResponse = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = tokenResponse.data;
    // console.log("This is accestoken ",access_token)

    // Use the access token to get user info
    const userResponse = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });

    const user = userResponse.data;
    // const userJson = JSON.stringify(user);
    // console.log("this is uesrdata", userJson);

    // console.log("this is uesrdata",typeof user);

    //create a user model and save the data into it

    const result = await User.create({
      userName: user.username,
      userId: user.id,
      avatar_Hash: user.avatar,
      banner_Hash: user.banner,
    });

    console.log("this is result ", result);

    const access_Token = jwt.sign(
      { _id: result._id.toString() },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refresh_Token = jwt.sign(
      { _id: result._id.toString() },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    // console.log("THis is result ",result)

    // Instead of redirecting, send an HTML page with a script
    // This script sends the user data to the parent window and then closes the popup.

    res
      .cookie("accessToken", access_Token, {
        maxAge: 864000000,
        httpOnly: true,
        sameSite: "none",
      })
      .cookie("refreshToken", refresh_Token, {
        maxAge: 2592000000,
        httpOnly: true,
        sameSite: "none",
      })
      .redirect("http://localhost:5173/leaderboard");
  } catch (error) {
    // console.error("Error during Discord auth:", error);
    if (error.code === 11000) {
      console.log("duplicate key errror likey user exist");

      // console.log("this is error",error)
      // console.log("this is username from error ",error.keyValue.userName)

      const existingUser = await User.findOne({
        userName: error.keyValue.userName,
      });

      if (!existingUser) {
        console.error(
          "Duplicate key error, but user not found with username:",
          username
        );
        return res.status(500).send("Error logging in after duplicate check.");
      }

      if (existingUser) {
        const access_Token = jwt.sign(
          { _id: existingUser._id.toString() },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        const refresh_Token = jwt.sign(
          { _id: existingUser._id.toString() },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );

        res
          .cookie("accessToken", access_Token, {
            maxAge: 864000000,
            httpOnly: true,
          })
          .cookie("refreshToken", refresh_Token, {
            maxAge: 2592000000,
            httpOnly: true,
          })
          .redirect("http://localhost:5173/leaderboard");
      } else {
        // Should not happen if error handling is correct, but as a fallback
        res.status(500).send("User object not available after auth attempt.");
      }
    } else {
      // --- 6. Handle Other Errors ---
      console.error("Error creating user:", error);
      return res.status(500).send("Error during authentication.");
    }

    // .error("Error during Discord auth:", error);

    // res.status(500).send("An error occurred during authentication.");
  }
  // });
};

const handleUserDetails = async (req, res) => {
  // console.log("got the req",req.user);

  const userDataToSend = {...req.user._doc}

  delete userDataToSend.avatar_Hash;
  // delete userDataToSend.$isNew;
  // delete userDataToSend.scores
  // delete userDataToSend._id
  delete userDataToSend.createdAt
  delete userDataToSend.updatedAt

  userDataToSend.avatar_url = `https://cdn.discordapp.com/avatars/${userDataToSend.userId}/${userDataToSend.avatar_Hash}.png`

  res.json({
    message: "ok",
    user: userDataToSend,
  });
};

const handleLogout = async (req, res) => {
  try {
    res.clearCookie("accessToken").clearCookie("refreshToken").json({
      message: "User logout successfully",
    });
  } catch (error) {
    console.error(error);
    throw new Error("There was an error ");
  }
};

// You'd call handleLogout() when the user clicks a logout button.

const handleEasyQuestion = async (req, res) => {
  const questionToSend = [];
  // console.log(easyQuestionBank?.length);

  for (let i = 0; i < 10; i++) {
    // const element = array[i];
    const randomIndex = Math.floor(Math.random() * 50);
    // console.log("This is random index", randomIndex);
    questionToSend.push(easyQuestionBank[randomIndex]);
  }
  res.status(200).json({
    message: "Successfull",
    QuestionBank: questionToSend,
  });
  // console.log("new question bank ", questionToSend);
};

const handleMediumQuestion = async (req, res) => {
  const questionToSend = [];
  // console.log(mediumQuestionBank?.length);

  for (let i = 0; i < 10; i++) {
    // const element = array[i];
    const randomIndex = Math.floor(Math.random() * 50);
    // console.log("This is random index", randomIndex);
    // console.log("thsi si questtosend0", mediumQuestionBank[randomIndex])
    let tempobj = { ...mediumQuestionBank?.[randomIndex] };

    delete tempobj?.answer;

    questionToSend.push(mediumQuestionBank[randomIndex]);
  }

  //  delete questionToSend?.answer

  res.status(200).json({
    message: "Successfull",
    QuestionBank: questionToSend,
  });
  // console.log("new question bank ", questionToSend);
};

const handleMediumeAnswerCheck = async (req, res) => {
  let score = 0;
  const data = req.body.data;

  for (let i = 0; i < data.length; i++) {
    const obj = data[i];
    const questionId = Number(obj.id) - 1;
    const correctAnswer = mediumQuestionBank[questionId].answer;

    // console.log("this is obj",obj)
    // console.log("this is correctanswer",correctAnswer)

    const isCorrect = obj.answer == correctAnswer;
    // console.log("this is status ",isCorrect)

    isCorrect ? score++ : null;
  }

  // console.log("This is data", data);

  return res.status(200).json({
    TotalScoreIs: score,
  });
};

const handleHardQuestion = async (req, res) => {
  const questionToSend = [];
  // console.log(easyQuestionBank?.length);

  for (let i = 0; i < 10; i++) {
    // const element = array[i];
    const randomIndex = Math.floor(Math.random() * 50);
    // console.log("This is random index", randomIndex);

    let tempobj = { ...hardQuestionBank?.[randomIndex] };
    // console.log("this is temp obj",tempobj)

    delete tempobj.answer;

    questionToSend.push(tempobj);
  }
  res.status(200).json({
    message: "Successfull",
    QuestionBank: questionToSend,
  });
  // console.log("new question bank ", questionToSend);
};

const handleHardAnswerCheck = async (req, res) => {
  let score = 0;
  const data = req.body.data;
  // console.log("This is response", req.body);
  // console.log("This si length ",data)
  // console.log("This type of  ",typeof data)
  // console.log("This si length ",data.length)

  for (let i = 0; i < data.length; i++) {
    const obj = data[i];
    const questionId = Number(obj.id) - 1;
    // console.log("this is obj ", obj);
    // console.log("THis is id of the question ", obj.id);
    // console.log("THis is the actual obj ", hardQuestionBank[questionId]);
    const correctAnswer = hardQuestionBank[questionId]?.answer;

    // console.log("this correct answer ", correctAnswer);

    const isCorrect = obj.answer == correctAnswer;
    // console.log("this status   ", isCorrect);

    isCorrect ? score++ : null;
  }
  return res.status(200).json({
    TotalScoreIs: score,
  });
  // console.log("total score is ", score);
};

// const handleUpdateScore = async (req, res) => {
//   const { level, score, totalTimeleft } = req.body;

//   console.log("This is req.body", req.body);

//   if (!level || !score) {
//     throw new Error("Level and score is required to update score");
//   }

//   const user = req.user;
//   // let tempTotalScore

//   if (level == "beginner") {
//     if (user.beginnerHighestScore < score) {
//       user.beginnerHighestScore = score;
//     } else {
//       return res.json({
//         message: "score is not higest from current higest score",
//       });
//     }
//   }if (level == "intermeidate") {
//     if (user.intermidateHigestScore < score) {
//       user.intermidateHigestScore = score * totalTimeleft ;
//     } else {
//       return res.json({
//         message: "score is not higest from current higest score",
//       });
//     }
//   }
//   if (level == "expert") {
//     if (user.expertHigestScore < score) {
//       user.expertHigestScore = score * totalTimeleft ;
//     } else {
//       return res.json({
//         message: "score is not higest from current higest score",
//       });
//     }
//   }

//   await user.save()

//   await Leaderboard.findOneAndUpdate(
//     {_id:user._id},
//     {
//       userId:_id,
//       userName: user.userName,
//       totalScore:

//     },{
//       upsert:true,new:true
//     }
//   )

//   console.log("thie is user ", user);
// };

const handleUpdateScore = async (req, res) => {
  // const { level, totalTimeLeft } = req.body;
  const { level, score, totalTimeLeft } = req.body;
  // const score = 3;
  // const totalTimeLeft = 100;

  console.log("Received update request ", req.body);

  if (!level || !score) {
    return res.status(400).json({ message: "level and score are required" });
  }

  const user = req.user;

  // console.log(user);

  let newlevelScore = score;

  let isNewHighScore = false;
  // let promoteLevel = "";
  let scoreFieldToUpdate = "";

  if (level === "Beginner") {
    scoreFieldToUpdate = "beginnerHighestScore";
    // scoreFieldToUpdate = user.scores.beginner.beginnerHighestScore;
    console.log("user old score", user.scores.Beginner.beginnerHighestScore);
    if (newlevelScore > user.scores.Beginner.beginnerHighestScore || 0) {
      console.log("we are enter in if loop ");
      isNewHighScore = true;
      if (user.userLevel == "Beginner") {
        if (newlevelScore > 7) {
          user.userLevel = "Intermediate";
        }
      }
    }
  } else if (level === "Intermediate") {
    scoreFieldToUpdate = "intermediateHighestScore";
    console.log("i was in intermeditate  ");
    newlevelScore *= 2;
    if (
      newlevelScore > user.scores.Intermediate.intermediateHighestScore ||
      0
    ) {
      isNewHighScore = true;
      // newlevelScore * 2

      if (user.userLevel == "Intermediate") {
        if (newlevelScore > 16) {
          user.userLevel = "Expert";
        }
      }
    }
  } else if (level === "Expert") {
    scoreFieldToUpdate = "expertHighestScore";
    newlevelScore *= 3;
    if (newlevelScore > user.scores.Expert.expertHighestScore || 0) {
      // newlevelScore * 3
      isNewHighScore = true;
    }
  } else {
    return res.status(400).json({ message: "Invalid level specified" });
  }

  try {
    if (isNewHighScore) {
      console.log(`New high score for ${level}: ${newlevelScore}`);

      // console.log("level",typeof level)
      // console.log("This is score field to update",user?.scores[level].scoreFieldToUpdate)
      // console.log("This is score field to update",user?.scores[level].scoreFieldToUpdate)
      const fieldPathForScoreUpdate = `scores.${level}.${scoreFieldToUpdate}`;
      const fieldPathForTotalTimeConsumedUpdate = `scores.${level}.timeConsumed`;
      // console.log("fieldpath", fieldPathForTotalTimeConsumedUpdate);

      user.set(fieldPathForScoreUpdate, newlevelScore);
      user.set(fieldPathForTotalTimeConsumedUpdate, 150-totalTimeLeft);

      console.log("before update user doc:", user);

      const newTotalScore =
        user.scores.Beginner.beginnerHighestScore +
        user.scores.Intermediate.intermediateHighestScore +
        user.scores.Expert.expertHighestScore;

      const newTotalTimeConsumed =
        user.scores.Beginner.timeConsumed +
        user.scores.Intermediate.timeConsumed +
        user.scores.Expert.timeConsumed;

      console.log("this is new totalscore:", newTotalScore);
      user.totalHighScore = newTotalScore;
      user.totalTimeConsumed = newTotalTimeConsumed;

      await user.save();
      console.log("User document updated:", user);

      const leaderboardEntry = await Leaderboard.findOneAndUpdate(
        { userId: user._id },
        {
          userId: user._id,
          discord_Id:user.userId,
          userName: user.userName,
          avatar: user.avatar_Hash,
          totalScore: newTotalScore,
          totalTimeConsumed: newTotalTimeConsumed,
        },
        {
          upsert: true,
          new: true,
        }
      );
      // console.log("Leaderboard updated/created:", leaderboardEntry);

      return res.status(200).json({
        message: "New high score updated successfully ",
        newTotalScore: newTotalScore,
        updatedLeaderboardEnty: leaderboardEntry,
      });
    } else {
      console.log(
        `Score ${newlevelScore} is not higher than current best for ${level}.`
      );
      return res.status(200).json({
        // Use 200 OK, it's not an error, just no update needed
        message:
          "Score is not higher than the current highest score for this level.",
      });
    }
  } catch (error) {
    console.error("Error in handleUpdateScore:", error);
    // More specific error handling if needed
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error saving user.",
        details: error.errors,
      });
    }
    return res
      .status(500)
      .json({ message: "Internal server error updating score." });
  }
};

const handleLeaderboardData = async (req, res) => {

  const top10LeaderboardData = await Leaderboard.find({ totalScore: { $gt: 0 } })
  .sort({totalScore: -1 ,totalTimeConsumed:1 })
  .limit(10)

  // const top10LeaderboardData = await Leaderboard.find()


  // console.log("this is the top ",top10LeaderboardData.length)

  return res.json({
    message:"ok",
    top10LeaderboardData
  })

};

export {
  handlediscordAuth,
  handleMediumQuestion,
  handleHardQuestion,
  handleCallBackFromDiscord,
  handleEasyQuestion,
  handleHardAnswerCheck,
  handleMediumeAnswerCheck,
  handleUserDetails,
  handleLogout,
  handleUpdateScore,
  handleLeaderboardData,
};
