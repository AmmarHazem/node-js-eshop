const UserModel = require("../models/Users");

const getAllUsers = async (request, response) => {
  const users = await UserModel.find({});
  const now = new Date();
  const currentYear = now.getFullYear();
  const lastYear = new Date();
  lastYear.setFullYear(currentYear - 1);
  const usersPerMonth = await UserModel.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    { $project: { month: { $month: "$createdAt" } } },
    { $group: { _id: "$month", total: { $sum: 1 } } },
  ]);
  response.send({
    usersPerMonth,
    users,
  });
};

const deleteUser = async (request, response) => {
  const deletedUser = await UserModel.findByIdAndRemove(request.params.id);
  if (!deleteUser) {
    throw new Error("invalid ID");
  }
  response.json({
    user: {
      _id: deletedUser._id,
      name: deletedUser.name,
      email: deletedUser.email,
      isAdmin: deletedUser.isAdmin,
      createdAt: deletedUser.createdAt,
    },
  });
};

const updateUser = async (request, response) => {
  if (request.params.id !== request.user._id && !request.user.isAdmin) {
    throw new Error("invalid user ID");
  }
  const updatedUser = await UserModel.findByIdAndUpdate(
    request.user._id,
    {
      name: request.body.name,
      email: request.body.email,
    },
    { new: true, runValidators: true }
  );
  response.json({
    user: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      createdAt: updatedUser.createdAt,
    },
  });
};

module.exports = { updateUser, deleteUser, getAllUsers };
