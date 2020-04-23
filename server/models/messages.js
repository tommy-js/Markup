const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  id: Number,
  from: String,
  to: String
});

module.exports = mongoose.model("Messages", messageSchema);
