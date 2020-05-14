const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersettingsSchema = new Schema({
  savedata: Boolean
});

module.exports = mongoose.model("userSettings", usersettingsSchema);
