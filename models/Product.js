const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      validate: function (value) {
        if (!value) {
          throw new Error("categories array is required");
        } else if (value.length < 1) {
          throw new Error("must have at least one category");
        }
        return true;
      },
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

ProductSchema.index({ title: "text" });
ProductSchema.index({ description: "text" });

module.exports = mongoose.model("Product", ProductSchema);
