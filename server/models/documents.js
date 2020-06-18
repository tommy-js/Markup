const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  id: Number,
  projectId: Number,
  name: String,
  update: [{ content: String, timestamp: Number, userId: Number }]
});

module.exports = mongoose.model("Documents", documentSchema);
