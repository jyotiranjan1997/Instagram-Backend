
const express = require("express");
const { UserVerifyMiddleware } = require("../middleware/verifyUser");

const User = require("./user");

const followerRoute = express.Router();

followerRoute.get("/", UserVerifyMiddleware, async (req, res) => {
  const { user_id } = req.body;
  
  try {
    let users = await User.find().limit(15);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { followerRoute };
