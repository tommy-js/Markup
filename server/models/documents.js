const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  id: Number,
  projectId: Number,
  content: String,
  name: String
});

module.exports = mongoose.model("Documents", documentSchema);
