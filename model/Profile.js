import timestamp from "mongoose-timestamp";
import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  address: {
    type: String,
  },

  description: {
    type: String,
  },

  social: {
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
});

ProfileSchema.plugin(timestamp);

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
