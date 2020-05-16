const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  id: Number,
  from: Number,
  to: Number,
  content: String,
  timestamp: Number,
  edited: Boolean
});

module.exports = mongoose.model("Message", messageSchema);
