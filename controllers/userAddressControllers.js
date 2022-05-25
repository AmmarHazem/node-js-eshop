const UserAddressModel = require("../models/UserAddress");
const { StatusCodes } = require("http-status-codes");

const deleteAddress = async (request, response) => {
  const { addressID } = request.params;
  const deletedAddress = await UserAddressModel.findOneAndDelete(
    { _id: addressID, user: request.user._id },
    { returnDocument: true }
  );
  //   const deletedAddress = await UserAddressModel.findByIdAndDelete(addressID, {
  //     returnDocument: true,
  //   });
  response.json({ address: deletedAddress });
};

const updateAddress = async (request, response) => {
  const { addressID } = request.params;
  const { country, city, line1, line2 } = request.body;
  if (!addressID) {
    throw new Error("invalid address ID");
  }
  const updatedAddress = await UserAddressModel.findByIdAndUpdate(
    addressID,
    {
      country,
      city,
      line1,
      line2,
    },
    { new: true, runValidators: true }
  );
  response.json({ address: updatedAddress });
};

const getAddresses = async (request, response) => {
  const addresses = await UserAddressModel.find({ user: request.user._id });
  response.json({ addresses });
};

const createAddress = async (request, response) => {
  const { country, city, line1, line2 } = request.body;
  const address = await UserAddressModel.create({
    user: request.user._id,
    country,
    city,
    line1,
    line2,
  });
  response.status(StatusCodes.CREATED).json({ address });
};

module.exports = { createAddress, getAddresses, updateAddress, deleteAddress };
