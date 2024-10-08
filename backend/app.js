require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const DB = require("./Models/DB"); // Ensure your DB connection is set up correctly

// Router imports
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const AuthRouter = require("./routes/AuthRouter");

const PORT = process.env.PORT || 3000;
const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware setup
app.use(helmet());

// CORS configuration
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",")
  : [process.env.BACKEND_URL]; // Default for development

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware for logging, parsing cookies, JSON and URL-encoded data
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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

  // Log the error for troubleshooting
  console.error(`Error occurred: ${err.message}`, err.stack);

  // Respond with error in JSON for API clients, otherwise render error page
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.status || 500).json({
      error: {
        message: err.message,
      },
    });
  }

  // Render the error page for web clients
  res.status(err.status || 500);
  res.render("error");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
