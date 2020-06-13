const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  leadId: Number,
  leadName: String,
  title: String,
  content: String,
  id: Number,
  timestamp: Number,
  total: Number,
  joined: Number,
  stack: String,
  members: [{ id: Number, name: String }],
  documents: [{ id: Number, content: String }]
});

module.exports = mongoose.model("Project", projectSchema);
