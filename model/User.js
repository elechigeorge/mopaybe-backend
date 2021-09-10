import timestamp from "mongoose-timestamp";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

mongoose.plugin(timestamp);
