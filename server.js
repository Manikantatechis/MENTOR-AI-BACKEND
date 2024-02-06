const express = require("express");
require("dotenv").config();
const chatRoute = require("./src/routes/chatRoute");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // Set secure HTTP headers

const allowedOrigins = [
  "http://127.0.0.1:5174",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
  process.env.ADMIN_FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api", chatRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`{server running on port ${PORT}}`));
