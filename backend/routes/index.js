const express = require("express");
const router = express.Router();
const UserModel = require("../Models/User");
const ContactModel = require("../Models/Contact");
const CategoryModel = require("../Models/Category");
const SocialModel = require("../Models/Social");
const ContactDetailSchema = require("../Models/ContactDetail");

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
    await ContactModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Contact query deleted successfully!" });
  } catch (error) {
    console.error("Error deleting contact query:", error);
    res.status(500).json({ error: "Failed to delete contact query." });
  }
});

// POST route to add a new category
router.post("/api/categories", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    const newCategory = new CategoryModel({ name });
    await newCategory.save();
    res
      .status(201)
      .json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Failed to add category" });
  }
});

// GET all categories
router.get("/api/categories", async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

// GET category by id
router.get("/api/categories/:id", async (req, res) => {
  const categoryId = req.params.id; // Check this line to ensure it's being assigned correctly
  try {
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res
      .status(500)
      .json({ message: "Error fetching category", error: error.message });
  }
});

// Update category by ID
router.put("/api/categories/:id", async (req, res) => {
  const { name } = req.body;

  // Validate request body
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update category name
    category.name = name;
    await category.save();

    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Error updating category:", error);
    res
      .status(500)
      .json({ message: "Error updating category", error: error.message });
  }
});

// Delete category by ID
router.delete("/api/categories/:id", async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
});

// Get all socials
router.get("/api/socials", async (req, res) => {
  try {
    const socials = await SocialModel.find();
    res.json(socials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific social by ID
router.get("/api/socials/:id", async (req, res) => {
  try {
    const social = await SocialModel.findById(req.params.id);
    if (!social) return res.status(404).json({ message: "Social not found" });
    res.json(social);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a specific social
router.put("/api/socials/:id", async (req, res) => {
  try {
    const social = await SocialModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true, // Ensures the updated data adheres to your schema
      }
    );
    if (!social) return res.status(404).json({ message: "Social not found" });
    res.json(social);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all contact details
router.get("/api/contact-details", async (req, res) => {
  try {
    const contacts = await ContactDetailSchema.find();
    // Return the first contact detail or an appropriate response if none exists
    if (contacts.length > 0) {
      res.json(contacts[0]); // Return only the first contact detail
    } else {
      res.status(404).json({ message: "No contact details found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get a specific contact detail
router.get("/api/contact-details/:id", async (req, res) => {
  try {
    const contact = await ContactDetailSchema.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a specific contact detail
router.put("/api/contact-details/:id", async (req, res) => {
  try {
    const contact = await ContactDetailSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
