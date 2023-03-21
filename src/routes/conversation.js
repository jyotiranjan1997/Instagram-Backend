const express = require("express");
const { friendsMiddleware2 } = require("../middleware/firendsMiddleware");
const { Conversation } = require("../model/conversation");
const conversationRoute = express.Router();

//add
conversationRoute.post("/", friendsMiddleware2, async (req, res) => {
  const { user_id, receiver_id } = req.body;
  console.log(user_id, receiver_id);
  try {
    let conversation = await Conversation.create({
      members: [user_id, receiver_id],
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
conversationRoute.get("/", friendsMiddleware2, async (req, res) => {
  const { user_id } = req.body;
  try {
    let conversations = await Conversation.find({
      members: { $in: [user_id] },
    });
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { conversationRoute };
