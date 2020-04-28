const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  id: Number,
  from: Number,
  to: Number,
  content: String
});

module.exports = mongoose.model("Message", messageSchema);
