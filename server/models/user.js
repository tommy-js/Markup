const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: Number,
  username: String,
  password: String,
  friends: [Number],
  tasks: [Number]
});

module.exports = mongoose.model("User", userSchema);
