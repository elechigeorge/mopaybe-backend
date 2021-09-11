import express from "express";
import auth from "../middlewares/authentication";
import { check } from "express-validator";
import checkObjectId from "../middlewares/checkObjectId";
const router = express.Router();
import { getProfile, createProfile } from "../controllers/Profile";

router
  .route("/")
  .post(
    auth,
    check("company", "Company Name is required").notEmpty(),
    check("description", "Business Description is required").notEmpty(),
    createProfile
  )
  .get(getProfile);

router.route("/user/:id").get(getMemberById);
router.route("/user/:user_id", checkObjectId("user_id")).get();

export default router;
