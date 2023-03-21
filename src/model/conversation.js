const mongoose = require("mongoose");

const ConversationModel = new mongoose.Schema(
  {
    members: { type: Array, required: true },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("conversation", ConversationModel);

module.exports = { Conversation };
