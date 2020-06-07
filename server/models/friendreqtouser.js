const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendreqSchema = new Schema({
  id: Number
});

module.exports = mongoose.model("FriendRequestToUser", friendreqSchema);
