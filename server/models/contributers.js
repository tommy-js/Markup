const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contributersSchema = new Schema({
  contribId: Number
});

module.exports = mongoose.model("Contributers", contributersSchema);
