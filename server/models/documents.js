const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  id: Number,
  content: String
});

module.exports = mongoose.model("Documents", documentSchema);
