import timestamp from "mongoose-timestamp";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    default: true,
  },
});

InvestorSchema.plugin(timestamp);

InvestorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

InvestorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Investor = mongoose.model("Investor", InvestorSchema);

export default Investor;
