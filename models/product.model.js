const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    productCode: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["burger", "drinks", "addons"],
      required: true,
    },
    foodType: {
      type: String,
      required: true,
      enum: ["non-veg", "veg"],
    },
    price: {
      type: Number,
      required: true,
    },
    mealDiscount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
