const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/events");
const { setupWebSocket } = require("./routes/real_time");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", eventRoutes);

// Start Server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// WebSocket
setupWebSocket(server);
