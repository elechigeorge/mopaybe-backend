import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import path from "path";
import mongoose from "mongoose";

// app
const server = express();

// URL ROUTES Configuration
import User from "./routes/User.js";
import Investor from "./routes/Investor.js";
import Profile from "./routes/Profile.js";
import Upload from "./routes/Uploads.js";

// middleware initialization
server.use(cors());
server.use("/uploads", express.static(path.join(__dirname, "/uploads")));
server.use(express.json({ limit: "50mb" }));
server.use(
  express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 1000000 })
);

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
server.use("/upload", Upload);

// server PORT Setup
const PORT = process.env.PORT || 5000;

// listen to server call
server.listen(PORT, () => console.log("Services running on port" + " " + PORT));
