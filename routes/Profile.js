import express from "express";
import { protect } from "../middlewares/authentication.js";
import { check } from "express-validator";
import checkObjectId from "../middlewares/checkObjectId.js";
const router = express.Router();
import {
  getProfile,
  createProfile,
  getAllProfile,
  getProfileById,
} from "../controllers/Profile.js";

router
  .route("/")
  .post(
    protect,
    check("company", "Company Name is required").notEmpty(),
    check("description", "Business Description is required").notEmpty(),
    createProfile
  )
  .get(protect, getProfile);

router.route("/all").get(getAllProfile);
router
  .route("/:user_id", checkObjectId("user_id"))
  .get(protect, getProfileById);

export default router;
