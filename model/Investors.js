import timestamp from "mongoose-timestamp";
import mongoose from "mongoose";

const InvestorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  isInvestor: {
    type: Boolean,
    default: false,
  },
});

UserSchema.plugin(timestamp);

const User = mongoose.model("User", UserSchema);

export default User;
