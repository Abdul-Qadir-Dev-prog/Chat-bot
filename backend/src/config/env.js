const dotenv = require("dotenv");

dotenv.config();

const config = {
  port: Number(process.env.PORT || 4000),
  allowedOrigin: process.env.ALLOWED_ORIGIN || "http://localhost:3000",
};

module.exports = config;
