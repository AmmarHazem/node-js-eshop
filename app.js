require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use((request, response) => {
  response.status(404).send("Route not found");
});
app.use(errorHandlerMiddleware);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => {
    console.log("Error connecting to DB", e);
  });

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
