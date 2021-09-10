import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

// app
const server = express();

// middleware initialization
server.use(express.urlencoded({ extended: true }));
