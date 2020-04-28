const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: Number,
  username: String,
  password: String,
  friends: [{ id: Number, name: String }]
});

module.exports = mongoose.model("User", userSchema);
