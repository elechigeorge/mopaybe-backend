import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import mongoose from "mongoose";

// app
const server = express();

// URL ROUTES Configuration
import User from "./routes/User.js";
import Investor from "./routes/Investor.js";
import Profile from "./routes/Profile.js";

// middleware initialization
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// DATABASE CONNECTION SETUP BLOCK
mongoose
  .connect(process.env.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connection established..."))
  .catch((error) => console.error(error.message));

// URL ROUTE Middlewares
server.use("/account", User);
server.use("/investor", Investor);
server.use("/profile", Profile);

// server PORT Setup
const PORT = process.env.PORT || 5000;

// listen to server call
server.listen(PORT, () => console.log("Services running on port" + " " + PORT));
