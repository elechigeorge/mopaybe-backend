import express from "express";

const router = express.Router();
import {
  authInvestor,
  registerInvestor,
  getInvestorById,
} from "../controllers/Investor.js";

router.route("/").post(registerInvestor);

router.route("/investor/:id").get(getInvestorById);

router.post("/login", authInvestor);

export default router;
