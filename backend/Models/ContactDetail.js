// models/ContactDetails.js
const mongoose = require("mongoose");

const contactDetailsSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const ContactDetails = mongoose.model("ContactDetails", contactDetailsSchema);
module.exports = ContactDetails;