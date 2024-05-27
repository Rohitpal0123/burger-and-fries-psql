const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mealSchema = new Schema(
  {
    mealNumber: {
      type: Number,
      required: true,
    },
    mealName: {
      type: String,
      required: true,
    },
    mealCode: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Object,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;
