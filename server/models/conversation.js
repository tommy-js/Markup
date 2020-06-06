const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  id: Number,
  messages: [
    {
      userId: Number,
      from: Number,
      to: Number,
      content: String,
      timestamp: Number,
      edited: Boolean
    }
  ]
});

module.exports = mongoose.model("Conversation", conversationSchema);
