const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  userId: Number,
  content: String,
  timestamp: Number,
  edited: Boolean
});

module.exports = mongoose.model("Conversation", conversationSchema);
