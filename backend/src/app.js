const express = require("express");
const cors = require("cors");
const config = require("./config/env");
const chatRoutes = require("./routes/chatRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

app.use(cors({ origin: config.allowedOrigin }));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "ecommerce-chatbot-api" });
});

app.use("/api/chat", chatRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/tickets", ticketRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
