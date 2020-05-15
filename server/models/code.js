const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeSchema = new Schema({
  id: Number,
  from: Number,
  to: Number,
  content: String,
  timestamp: Number
});

module.exports = mongoose.model("Code", codeSchema);
