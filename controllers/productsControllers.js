const { StatusCodes } = require("http-status-codes");
const ProductModel = require("../models/Product");

const getProducts = async (request, response) => {
  const { title } = request.query;
  let { categories } = request.query;
  if (
    typeof categories !== "object" &&
    categories !== undefined &&
    categories !== null
  ) {
    categories = [categories];
  }
  //   console.log("--- categories", categories);
  const filter = {};
  const projection = {};
  const sort = {};
  if (title) {
    filter.$text = { $search: title };
    projection.score = { $meta: "textScore" };
    sort.score = { $meta: "textScore" };
  }
  if (categories) {
    filter.$or = [];
    for (const category of categories) {
      filter.$or.push({ categories: category });
    }
  }
  const products = await ProductModel.find(filter, projection).sort(sort);
  response.json({
    count: products.length,
    products,
  });
};

const deleteProduct = async (request, response) => {
  const { productID } = request.params;
  const deletedProduct = await ProductModel.findByIdAndDelete(productID);
  if (!deletedProduct) {
    throw new Error("invalid product ID");
  }
  response.json({
    _id: deletedProduct._id,
  });
};

const updateProduct = async (request, response) => {
  const { productID } = request.params;
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productID,
    {
      title: request.body.title,
      description: request.body.description,
      image: request.body.image,
      categories: request.body.categories,
      size: request.body.size,
      color: request.body.color,
      price: request.body.price,
    },
    { new: true, runValidators: true }
  );
  if (!updatedProduct) {
    throw new Error("invalid product ID");
  }
  response.json({ product: updatedProduct });
};

const createProduct = async (request, response) => {
  const product = await ProductModel.create({
    title: request.body.title,
    description: request.body.description,
    image: request.body.image,
    categories: request.body.categories,
    size: request.body.size,
    color: request.body.color,
    price: request.body.price,
  });
  response.status(StatusCodes.CREATED).json({ product });
};

module.exports = { createProduct, updateProduct, deleteProduct, getProducts };
