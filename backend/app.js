require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const DB = require("./Models/DB");

// Router imports
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const AuthRouter = require("./routes/AuthRouter");

const PORT = process.env.PORT || 3000;
const app = express();

// Security-related middlewares (Helmet for HTTP headers, Rate Limiter)
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Use helmet to set secure HTTP headers
app.use(helmet());

// Set up rate limiter for API requests to prevent abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/auth", apiLimiter);

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// CORS configuration
const allowedOrigins = process.env.FRONTEND_URL || "*"; // Use FRONTEND_URL from .env or fallback to "*"
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Middleware setup
app.use(logger("dev")); // Logging
app.use(express.json()); // Use built-in JSON parser (replacing bodyParser.json())
app.use(express.urlencoded({ extended: false })); // Use built-in URL-encoded parser (replacing bodyParser.urlencoded())
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
  console.error(`Error occurred: ${err.message}`);

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
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

module.exports = app;
