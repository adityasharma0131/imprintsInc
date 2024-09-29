// models/Social.js
const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});
const Social = mongoose.model("Social", socialSchema);
module.exports = Social;
