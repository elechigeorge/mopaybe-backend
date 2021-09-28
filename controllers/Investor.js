import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Investor from "../model/Investors.js";

// @desc    Auth user & get token
// @route   POST /investor/login
// @access  Public
const authInvestor = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  const investor = await Investor.findOne({ email });

  if (investor && (await investor.matchPassword(password))) {
    res.json({
      password: investor.password,
      name: investor.name,
      email: investor.email,
      token: generateToken(investor._id),
      date: investor.createdAt,
      id: investor._id,
      isInvestor: investor.isInvestor,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// @desc    Register a new user
// @route   POST /investor
// @access  Public
const registerInvestor = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const investorExists = await Investor.findOne({ email });

  if (investorExists) {
    res.status(400);
    throw new Error("That Email is Taken");
  }

  const investor = await Investor.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  });

  if (investor) {
    res.status(201).json({
      name: investor.name,
      email: investor.email,
      token: generateToken(investor._id),
      date: investor.createdAt,
      id: investor._id,
      isInvestor: investor.isInvestor,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user by ID
// @route   GET /investor/:id
// @access  Private/Admin
const getInvestorById = asyncHandler(async (req, res) => {
  const investor = await Investor.findById(req.params.id).select("-password");

  if (investor) {
    res.json(investor);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authInvestor, registerInvestor, getInvestorById };
