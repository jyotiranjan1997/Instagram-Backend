const express = require("express");
const { UserVerifyMiddleware } = require("../middleware/verifyUser");
const { Comment } = require("../model/comment");

const commentRoute = express.Router();

commentRoute.post("/:post_id", UserVerifyMiddleware, async (req, res) => {
  const { user_id, title } = req.body;
  const { post_id } = req.params;
  try {
    let comment = await Comment.create({ user_id, post_id, title });
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

commentRoute.get("/:post_id", UserVerifyMiddleware, async (req, res) => {
  const { post_id } = req.params;
  try {
    let comments = await Comment.find({_id: post_id });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { commentRoute };
