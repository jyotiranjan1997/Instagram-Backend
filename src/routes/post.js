const express = require("express");
const { friendsMiddleware } = require("../middleware/firendsMiddleware");
const { UserVerifyMiddleware } = require("../middleware/verifyUser");
const { Post } = require("../model/post");
const PostRoute = express.Router();

PostRoute.post("/", UserVerifyMiddleware, async (req, res) => {
  const { user_id, image_url, tags, title } = req.body;
  try {
    let post = await Post.create({
      user_id,
      image_url,
      tags,
      title,
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

PostRoute.get("/", friendsMiddleware, async (req, res) => {
  const { user } = req.body;
  try {
    let userPosts = await Post.find({ user_id: user._id });
    let Posts = await Post.find();
    res.status(200).json(Posts);
  } catch (err) {
    res.status(500).json(err);
  }
});


PostRoute.patch("/:postid", friendsMiddleware, async (req, res) => {
  const { user, likes } = req.body;
  const { postid } = req.params;
  try {
    let Posts = await Post.findByIdAndUpdate({_id:postid},{likes});
    res.status(200).json(Posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { PostRoute };
