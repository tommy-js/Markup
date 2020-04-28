const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendSchema = new Schema({
  id: Number,
  userId: Number
});

module.exports = mongoose.model("Friend", friendSchema);
