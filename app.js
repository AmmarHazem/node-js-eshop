require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productsRoutes = require("./routes/productsRoutes");
const cartRouts = require("./routes/cartRoutes");
const userAddressRoutes = require("./routes/userAddressRoutes");
const orderRoutes = require("./routes/ordersRoutes");
const authenticationMiddleware = require("./middleware/authenticationMiddleware");
const CartModel = require("./models/Cart");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", [authenticationMiddleware], cartRouts);
app.use("/api/user-address", [authenticationMiddleware], userAddressRoutes);
app.use("/api/orders", [authenticationMiddleware], orderRoutes);

app.use("/eshop/testing", async (request, response) => {
  const cart = await CartModel.findOne({
    user: "628696ca825e8bef06812987",
  });
  // cart.products.push({ product: "6288ea7b385f84683a85f6ed" });
  // await cart.save();
  response.send({ cart });
});

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
