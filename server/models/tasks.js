const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  id: Number,
  userId: Number,
  content: String
});

module.exports = mongoose.model("Tasks", taskSchema);
