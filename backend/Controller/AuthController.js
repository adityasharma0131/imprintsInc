const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User"); // Adjust the path according to your project structure
require("dotenv").config(); // Load environment variables from .env file

const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Respond with success message and token
    return res.status(201).json({
      message: "User created successfully",
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // Respond with success message and token
    return res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
};
