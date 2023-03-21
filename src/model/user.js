const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    dateOfBirth: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      min: 5,
      max: 20,
    },
    username: { type: String, require: true, unique: true },
    followers: { type: [] },
    followings:{type:[]},
  },
  { timestamp: true }
);

const User = mongoose.model("user", userSchema);

module.exports = { User };
