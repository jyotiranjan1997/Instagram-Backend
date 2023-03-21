const express = require("express");
const bcrypt = require("bcrypt");
const userRoute = express.Router();
const salt = 8;
const { User } = require("../model/user");
const {
  verifyUser,
  UserVerifyMiddleware,
} = require("../middleware/verifyUser");

// User Sign up methode

userRoute.post("/signup", async (req, res) => {
  const { name, email, username, password, dateOfBirth } = req.body;
  try {
    bcrypt.hash(password, salt, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        res.status(500).json("Something went wrong");
      } else {
        let user = await User.create({
          name,
          email,
          username,
          password: hash,
          dateOfBirth,
        });
        res.status(200).json(user);
      }
    });
  } catch (err) {
    res.status(500).json("Signup failed !");
  }
});

// User Login methode

userRoute.post("/login", verifyUser, async (req, res) => {
  const { token } = req.body;
  try {
    res.status(200).json(token);
  } catch (err) {
    res.status(500).json("Login failed !");
  }
});

userRoute.get("/", UserVerifyMiddleware, async (req, res) => {
  const { user_id } = req.body;
  try {
    const user = await User.findOne({ _id: user_id });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("User Not found!");
  }
});

userRoute.get("/findFrineds", UserVerifyMiddleware, async (req, res) => {
  const { user_id } = req.body;
  
  try {
    let users = await User.find().limit(20);
    res.status(200).json(users);
  } catch (err) {}
});

// User data edit req

userRoute.patch("/", UserVerifyMiddleware, async (req, res) => {
  const { user_id, name, email, dateOfBirth, followings_id } = req.body;
  try {
    if (followings_id) {
      let user = await User.findByIdAndUpdate(
        { _id: user_id },
        { followings: [...followings_id] }
      );
      res.status(200).json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        { _id: user_id },
        { name, email, dateOfBirth }
      );
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { userRoute };
