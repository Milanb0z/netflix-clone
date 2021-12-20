const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { required: true, type: String, unique: true },
    email: { required: true, type: String, unique: true },
    password: { type: String, unique: true },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
