const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const updateSchema = new Schema({
  userId: Number,
  timestamp: Number,
  content: String
});

module.exports = mongoose.model("Update", updateSchema);
