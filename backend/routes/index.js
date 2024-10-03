const express = require("express");
const router = express.Router();
const UserModel = require("../Models/User");
const ContactModel = require("../Models/Contact");
const CategoryModel = require("../Models/Category");
const SocialModel = require("../Models/Social");
const ContactDetailSchema = require("../Models/ContactDetail");
const LogoSchema = require("../Models/Logo");
const ProductSchema = require("../Models/Product");

const fs = require("fs");
const multer = require("multer");
const path = require("path");

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save to "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

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

// POST route to add a new category with image uploads
router.post(
  "/api/categories",
  upload.fields([
    { name: "desktopBackdrop", maxCount: 1 },
    { name: "mobileBackdrop", maxCount: 1 },
  ]),
  async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    try {
      const newCategory = new CategoryModel({
        name,
        desktopBackdrop: req.files.desktopBackdrop
          ? req.files.desktopBackdrop[0].path
          : "",
        mobileBackdrop: req.files.mobileBackdrop
          ? req.files.mobileBackdrop[0].path
          : "",
      });

      await newCategory.save();
      res.status(201).json({
        message: "Category added successfully",
        category: newCategory,
      });
    } catch (error) {
      console.error("Error adding category:", error);
      res.status(500).json({ error: "Failed to add category" });
    }
  }
);

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

// PUT route to update category
router.put(
  "/api/categories/:id",
  upload.fields([
    { name: "desktopBackdrop", maxCount: 1 },
    { name: "mobileBackdrop", maxCount: 1 },
  ]),
  async (req, res) => {
    const { name } = req.body;

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

      // Update desktop backdrop if a new one is uploaded
      if (req.files.desktopBackdrop) {
        // Delete the old image
        if (
          category.desktopBackdrop &&
          fs.existsSync(category.desktopBackdrop)
        ) {
          fs.unlinkSync(path.resolve(category.desktopBackdrop));
        }
        // Save the new image path
        category.desktopBackdrop = `uploads/${req.files.desktopBackdrop[0].filename}`;
      }

      // Update mobile backdrop if a new one is uploaded
      if (req.files.mobileBackdrop) {
        // Delete the old image
        if (category.mobileBackdrop && fs.existsSync(category.mobileBackdrop)) {
          fs.unlinkSync(path.resolve(category.mobileBackdrop));
        }
        // Save the new image path
        category.mobileBackdrop = `uploads/${req.files.mobileBackdrop[0].filename}`;
      }

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
  }
);

// Delete category by ID
router.delete("/api/categories/:id", async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Paths for desktop and mobile backdrops
    const desktopBackdropPath = category.desktopBackdrop;
    const mobileBackdropPath = category.mobileBackdrop;

    // Delete desktop backdrop if it exists
    if (desktopBackdropPath && fs.existsSync(desktopBackdropPath)) {
      fs.unlinkSync(path.resolve(desktopBackdropPath)); // Delete the file
    }

    // Delete mobile backdrop if it exists
    if (mobileBackdropPath && fs.existsSync(mobileBackdropPath)) {
      fs.unlinkSync(path.resolve(mobileBackdropPath)); // Delete the file
    }

    // Delete the category from the database
    await CategoryModel.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ message: "Category and associated images deleted successfully" });
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

router.post("/api/categories/:categoryId/subcategories", async (req, res) => {
  const { categoryId } = req.params;
  const { subcategory } = req.body;

  // Check if subcategory is provided in the request body
  if (!subcategory || typeof subcategory !== "string") {
    return res
      .status(400)
      .json({ error: "Subcategory is required and must be a string" });
  }

  try {
    // Find the category by ID
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Check if the subcategory already exists in the category
    if (category.subcategories.includes(subcategory)) {
      return res.status(400).json({ error: "Subcategory already exists" });
    }

    // Add the new subcategory
    category.subcategories.push(subcategory);
    await category.save();

    return res.status(200).json({
      message: "Subcategory added successfully",
      category,
    });
  } catch (error) {
    console.error("Error adding subcategory:", error.message); // Improved logging
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message }); // Include error details
  }
});

// Delete subcategory endpoint
router.delete("/api/categories/:categoryId/subcategories", async (req, res) => {
  const { categoryId } = req.params;
  const { subcategory } = req.body;

  try {
    // Find the category and update its subcategories
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Filter out the subcategory
    category.subcategories = category.subcategories.filter(
      (sub) => sub !== subcategory
    );

    // Save the updated category
    await category.save();

    res
      .status(200)
      .json({ message: "Subcategory deleted successfully", category });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting subcategory", error: error.message });
  }
});
// PUT endpoint to update a subcategory
router.put("/api/categories/:categoryId/subcategories", async (req, res) => {
  const { categoryId } = req.params;
  const { oldSubcategory, newSubcategory } = req.body;

  try {
    // Find the category by ID
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if the old subcategory exists
    if (!category.subcategories.includes(oldSubcategory)) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    // Update the subcategory name
    category.subcategories = category.subcategories.map((sub) =>
      sub === oldSubcategory ? newSubcategory : sub
    );

    // Save the updated category
    await category.save();

    return res
      .status(200)
      .json({ message: "Subcategory updated successfully", category });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error updating subcategory", error: error.message });
  }
});

// Serve static files from the "uploads" directory
router.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API to handle file upload
router.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const { filename, path: filePath, size, mimetype } = req.file;

    const newImage = new LogoSchema({
      filename,
      path: filePath,
      size,
      mimetype,
    });

    await newImage.save();
    res
      .status(201)
      .json({ message: "Image uploaded successfully", image: newImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to upload image" });
  }
});
// Fetch all logos
router.get("/api/logos", async (req, res) => {
  try {
    const logos = await LogoSchema.find(); // Fetch all logos from MongoDB
    res.json(logos); // Return logos as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch logos" });
  }
});

// Delete a logo
router.delete("/api/logos/:id", async (req, res) => {
  try {
    // Find and delete the logo by ID
    const logo = await LogoSchema.findByIdAndDelete(req.params.id);

    if (!logo) return res.status(404).json({ message: "Logo not found" });

    // Get the file path
    const filePath = path.join(__dirname, "../uploads", logo.filename);

    // Remove the file from the uploads folder
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return res.status(500).json({ message: "Failed to delete logo file" });
      }

      // Send a success response only after file deletion
      res.json({ message: "Logo deleted successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete logo" });
  }
});

// Route to add a product
router.post("/api/products", upload.array("images", 10), async (req, res) => {
  try {
    const { name, category, subcategory, description, features } = req.body;
    const images = req.files.map((file) => file.path); // Get the uploaded image paths

    const product = new ProductSchema({
      name,
      category,
      subcategory,
      description,
      features,
      images,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product" });
  }
});

router.get("/api/products", async (req, res) => {
  try {
    const products = await ProductSchema.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// DELETE endpoint to remove a product by ID and its associated images
router.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductSchema.findById(id);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Define the path to the uploads folder
    const imageFolderPath = path.resolve(__dirname, "../uploads"); // Adjust this path to point to the correct uploads folder

    // Delete each image associated with the product
    if (Array.isArray(product.images) && product.images.length > 0) {
      product.images.forEach((image) => {
        // Construct the image path using the stored path
        const imagePath = path.join(image); // Use the full path stored in the database
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(`Error deleting image ${image}:`, err);
          } else {
            console.log(`Successfully deleted image ${image}`);
          }
        });
      });
    }

    // Delete the product from the database
    await ProductSchema.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
});

// Fetch product by ID
router.get("/api/products/:id", async (req, res) => {
  try {
    const product = await ProductSchema.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product" });
  }
});
router.put("/api/products/:id", upload.array("images"), async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductSchema.findById(id);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product fields
    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.subcategory = req.body.subcategory || product.subcategory; // Update subcategory
    product.description = req.body.description || product.description;
    product.features = req.body.features || product.features;

    // Update images only if new ones are provided
    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => `uploads/${file.filename}`); // Store the relative path to the image
      product.images = images; // Update the images array only if new images are provided
    }

    // Save the updated product
    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message }); // Send error message back
  }
});
module.exports = router;
