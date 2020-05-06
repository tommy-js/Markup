const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  content: String,
  id: Number,
  timestamp: Number,
  total: Number,
  joined: Number,
  stack: String
});

module.exports = mongoose.model("Project", projectSchema);
