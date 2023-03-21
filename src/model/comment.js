const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.ObjectId, required: true },
    post_id: { type: String, require: true },
    title: { type: String, require: true },
    reply: { type: Array },
  },
  { timestamp: true }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = { Comment };
