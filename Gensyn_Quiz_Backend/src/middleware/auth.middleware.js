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

    req.user = user
    // console.log("result", result);

    next();
  } catch (error) {
    console.error("There was an errror while verifying jwt ", error);
  }
};
