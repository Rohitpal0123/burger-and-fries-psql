const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    orderNumber: {
      type: Number,
      required: true,
    },
    items: {
      type: Object,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    coinsEarned: {
      type: Number,
      required: true,
    },
    useCoins: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
