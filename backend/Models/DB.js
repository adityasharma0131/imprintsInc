const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

// Connect to MongoDB Atlas cluster using the connection string from .env
const connect = mongoose.connect(process.env.MONGODB_URI);

connect
  .then(() => {
    console.log("Database Connected Successfully!!");
  })
  .catch((error) => {
    console.error("Error Connecting to Database!", error);
  });
