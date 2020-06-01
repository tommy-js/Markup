const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectMember = new Schema({
  id: Number,
  name: String
});

module.exports = mongoose.model("ProjectMember", projectMember);
