const express = require("express");
const router = express.Router();
const UserModel = require("../Models/User");
const ContactModel = require("../Models/Contact");
const Contact = require("../Models/Contact");

// GET home page
router.get("/", (req, res) => {
  res.render("index", { title: "Server Side" });
});

// GET to fetch all users
router.get("/api/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

// GET to fetch a specific user by ID
router.get("/api/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
});

// PUT to update a user by ID
router.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the updated document
        runValidators: true, // Validate updated data against the model schema
      }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
});

// DELETE to delete the user
router.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." }); // Handle case where user doesn't exist
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user." });
  }
});

// POST route to inset all the contact queries
router.post("/api/contact", async (req, res) => {
  const { name, phone, companyName, email, budget, giftsNeeded, message } =
    req.body;

  try {
    // Create a new contact document
    const newContact = new ContactModel({
      name,
      phone,
      companyName,
      email,
      budget,
      giftsNeeded,
      message,
    });

    // Save to the database
    await newContact.save();

    res.status(201).json({ message: "Contact form submitted successfully!" });
  } catch (error) {
    console.error("Error saving contact form:", error);
    res.status(500).json({ error: "Failed to submit contact form." });
  }
});

// GET route to fetch all contact queries
router.get("/api/contact", async (req, res) => {
  try {
    const contacts = await ContactModel.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contact queries:", error);
    res.status(500).json({ error: "Failed to fetch contact queries." });
  }
});

// DELETE route to delete a contact query by ID
router.delete("/api/contact/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: "Contact query deleted successfully!" });
  } catch (error) {
    console.error("Error deleting contact query:", error);
    res.status(500).json({ error: "Failed to delete contact query." });
  }
});

module.exports = router;
