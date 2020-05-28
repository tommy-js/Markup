const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendreqSchema = new Schema({
  toId: Number,
  fromId: Number,
  name: String
});

module.exports = mongoose.model("FriendRequest", friendreqSchema);
