const express = require("express");
const { friendsMiddleware } = require("../middleware/firendsMiddleware");
const { Messege } = require("../model/messege");
const messegeRoute = express.Router();

//add

messegeRoute.post("/", friendsMiddleware, async (req, res) => {
  const { conversation_id, user_id, text } = req.body;
  try {
    let messege = await Messege.create({
      conversation_id,
      sender_id: user_id,
      text,
    });
    res.status(200).json(messege);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

messegeRoute.get("/:conversation_id", friendsMiddleware, async (req, res) => {
  const { conversation_id } = req.params;
  try {
    let messeges = await Messege.find({ conversation_id: conversation_id });
    console.log(messeges);
    res.status(200).json(messeges);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { messegeRoute };
