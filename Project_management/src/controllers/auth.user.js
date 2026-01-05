import ApiError from "../utils/apierror.js";
import ApiResponse from "../utils/apiresponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/model.js";
import {
  sendEmail,
  forgetPasswordMailgenContent,
  emailVerificationMailgenContent,
} from "../utils/mail.js";

const generateaccessandrefreshtoken = async (userId) => {
  try {
    const user = await User.findbyId(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(500, "Something went wrong while generating ApiToken");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, username, role } = req.body;
  console.log(
    `email:${email} and password ${password} and username: ${username}`,
  );
  const findUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (findUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  const user = await User.create({
    email,
    password,
    username,
    isEmailVerified: false,
  });

  const { unhashedToken, hashedToken, tokenExpirey } =
    user.generatetemporarytoken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpirey;

  await user.save({ valideBeforeSave: false });

  await sendEmail({
    email: user.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      `${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`,
    ),
  });

  const findUserById = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
  );

  if (!findUserById) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: findUserById },
        "User regisered successfully and verification email has been sent on your email",
      ),
    );
});

export { registerUser };
