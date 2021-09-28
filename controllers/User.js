import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../model/User.js";

// @desc    Auth user & get token
// @route   POST /account/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      password: user.password,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// @desc    Register a new user
// @route   POST /account
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("That Email is Taken");
  }

  const user = await User.create({
    password: req.body.password,
    email: req.body.email,
  });

  if (user) {
    res.status(201).json({
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user by ID
// @route   GET /account/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, registerUser, getUserById };
