require("dotenv").config(); // Load .env file

// Module imports
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser"); // Import body-parser

const DB = require("./Models/DB");

// Router imports
const indexRouter = require("./routes/server");
const usersRouter = require("./routes/users");
const AuthRouter = require("./routes/AuthRouter");

const app = express();

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// CORS configuration
const allowedOrigins = process.env.FRONTEND_URL; // Use FRONTEND_URL from .env or fallback to "*"
app.use(
  cors({
    origin: allowedOrigins, // Frontend URL from .env
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials if needed
    optionsSuccessStatus: 200,
  })
);

// Middleware setup
app.use(logger("dev")); // Logging
app.use(bodyParser.json()); // Use body-parser to parse JSON
app.use(bodyParser.urlencoded({ extended: false })); // Use body-parser to parse URL-encoded data
app.use(cookieParser()); // Parse cookies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", AuthRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Global error handler
app.use((err, req, res, next) => {
  // Provide error only in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Log the error for troubleshooting (optional)
  console.error(`Error occurred: ${err.message}`);

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
