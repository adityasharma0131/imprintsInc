const express = require("express");
const router = express.Router();
const UserModel = require("../Models/User");

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Server Side" });
});

/* GET users list. */
router.get("/api/users", async (req, res) => {
  try {
    const users = await UserModel.find(); // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

module.exports = router;
