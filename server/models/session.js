const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  session_id: String
});

module.exports = mongoose.model("Session", sessionSchema);
