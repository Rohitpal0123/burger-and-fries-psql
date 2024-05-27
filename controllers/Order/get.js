const asyncHandler = require("../../middleware/asyncHandler");
const Order = require("../../models/order.model");
const { apiError } = require("../../lib/apiError");

class getOrder {
  process = asyncHandler(async (req, res) => {
    const orders = await Order.find();
    if (!orders) throw new apiError(400, "Order not found!")();

    res.status(200).json(orders);
  });
}

module.exports = new getOrder();
