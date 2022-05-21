const UserModel = require("../models/Users");
const jwt = require("jsonwebtoken");

const register = async (request, response) => {
  const user = await UserModel.create({
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
  });
  response.json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    },
  });
};

const login = async (request, response) => {
  const user = await UserModel.findOne({
    name: request.body.name,
  });
  if (!user) {
    throw new Error("invalid credentials");
  }
  const correctPassword = await user.comparePasswords(request.body.password);
  if (!correctPassword) {
    throw new Error("invalid credentials");
  }
  const responseUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
  };
  const accessToken = jwt.sign(responseUser, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  response.json({
    user: responseUser,
    accessToken,
  });
};

module.exports = { login, register };
