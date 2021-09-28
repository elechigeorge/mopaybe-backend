import asyncHandler from "express-async-handler";
// bring in normalize to give us a proper url, regardless of what user entered
import normalize from "normalize-url";
import { validationResult } from "express-validator";
import Profile from "../model/Profile.js";
import User from "../model/User.js";

// @route    GET /profile/me
// @desc     Get current users profile
// @access   Private
const getProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user");

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST /profile
// @desc     Create or update user profile
// @access   Private
const createProfile = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // destructure the request
  const {
    website,
    twitter,
    instagram,
    linkedin,
    facebook,
    // spread the rest of the fields we don't need to check
    ...rest
  } = req.body;

  // build a profile
  const profileFields = {
    user: req.user.id,
    images: req.body.images,
    website:
      website && website !== "" ? normalize(website, { forceHttps: true }) : "",
    ...rest,
  };

  // Build socialFields object
  const socialFields = { twitter, instagram, linkedin, facebook };

  // normalize social fields to ensure valid url
  for (const [key, value] of Object.entries(socialFields)) {
    if (value && value.length > 0)
      socialFields[key] = normalize(value, { forceHttps: true });
  }
  // add to profileFields
  profileFields.social = socialFields;

  try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
      {
        user: req.user,
      },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
const getAllProfile = asyncHandler(async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user");
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
const getProfileById = asyncHandler(async ({ params: { user_id } }, res) => {
  try {
    const profile = await Profile.findOne({
      user: user_id,
    }).populate("user");

    if (!profile) return res.status(400).json({ msg: "Profile is not found" });

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

export { getProfile, createProfile, getProfileById, getAllProfile };
