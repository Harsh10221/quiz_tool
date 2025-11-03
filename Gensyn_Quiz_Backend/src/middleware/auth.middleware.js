import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyJwt = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    //  console.log("THis is obj", req.cookies);
    //  console.log("THis is accesstken", accessToken);

    if (!accessToken) {
      throw new Error("AccessToken required ");
    }

    const result = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (!result) {
      throw new Error("AccessToken authorazation failed ");
    }

    const user = await User.findById(result._id);

    if (!user) {
      throw new Error("User not found with this userid ");
    }

    req.user = user;
    // console.log("result", result);

    next();
  } catch (error) {

    console.log("thos os errpr ",error.name)

    if (error.name === "TokenExpiredError") {
      const refreshToken = req.cookies.refreshToken;

      console.log("i entered in if statement ")

      if (!refreshToken) {
        return res.status(404).json({ message: "RefreshToken required" });
      }
      try {
        const decode = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        console.log("THis is decode ",decode)

        console.log("THis is old refresh token ",refreshToken)
        
        const user = await User.findById(decode._id);
        
        console.log("User refresh token  ",user.refresh_Token)

        if (!user) {
          return res.status(404).json({ message: "User not Found" });
        }
        
        console.log("Are the token are matched",user.refresh_Token === refreshToken)

        if (user.refresh_Token !== refreshToken) {
          return res.status(401).json({ message: "Token are not matched" });
        }
        
        const newAccess_Token = jwt.sign(
          { _id: user._id.toString() },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );
        const newRefresh_Token = jwt.sign(
          { _id: user._id.toString() },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );
        // console.log("THis is old refresh token ",user)

        user.refresh_Token = newRefresh_Token;

        console.log("This is new refresh token ",newRefresh_Token)

        await user.save();

        return res
          .cookie("accessToken", newAccess_Token, {
            httpOnly: true,
            // sameSite: "none",
            secure: false,
        path: "/",
          })
          .cookie("refreshToken", newRefresh_Token, {
            httpOnly: true,
            // sameSite: "none",
            secure: false,
        path: "/",
          })
          .json({ message: "New accessToken is genereated " });
      } catch (error) {

        console.error("Error while generating new token ",error)

      }
    }

    console.error("There was an errror while verifying jwt ", error);
  }
};
