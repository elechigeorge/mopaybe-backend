import express from "express";

const router = express.Router();
import {
  authUser,
  registerUser,
  getMemberById,
} from "../controller/Investor.js";

router.route("/").post(registerUser);

router.route("/investor/:id").get(getMemberById);

router.post("/login", authUser);

export default router;
