import express from "express";

const router = express.Router();
import { authUser, registerUser, getMemberById } from "../controller/User.js";

router.route("/").post(registerUser);

router.route("/user/:id").get(getMemberById);

router.post("/login", authUser);

export default router;
