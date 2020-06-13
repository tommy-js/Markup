const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userAccessSchema = new Schema({
  id: Number
});

module.exports = mongoose.model("userAccess", userAccessSchema);
