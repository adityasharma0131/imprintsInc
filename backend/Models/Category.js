const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subcategories: {
    type: [String],
    default: [],
  },
  desktopBackdrop: {
    type: String, // Path to the desktop backdrop image
    default: "",
  },
  mobileBackdrop: {
    type: String, // Path to the mobile backdrop image
    default: "",
  },
});

module.exports = mongoose.model("Category", CategorySchema);
