const express = require("express");
const router = express.Router();
const UserModel = require("../Models/User");

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Server Side" });
});

router.get("/api/users", async (req, res) => {
  try {
    const users = await UserModel.find(); // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error); // Log error for debugging
    res.status(500).json({ message: "Error fetching users", error });
  }
});

module.exports = router;
