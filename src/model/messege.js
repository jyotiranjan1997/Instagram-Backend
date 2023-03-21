const mongoose = require("mongoose");

const MessegeModel = new mongoose.Schema(
  {
    conversation_id: { type: String, require: true },
    sender_id: { type: String, require: true },
    text: { type: String, require: true },
  },
  { timestamp: true }
);

const Messege = mongoose.model("messege", MessegeModel);

module.exports = { Messege };
