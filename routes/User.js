import express from "express";

const router = express.Router();
import { authUser, registerUser, getUserById } from "../controllers/User.js";

router.route("/").post(registerUser);

router.route("/user/:id").get(getUserById);

router.post("/login", authUser);

export default router;
