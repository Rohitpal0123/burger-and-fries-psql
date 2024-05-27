const Order = require("../../models/order.model");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class deleteOrder {
  process = asyncHandler(async (req, res) => {
    const deletedOrder = await Order.deleteMany({});
    if (!deletedOrder) throw new apiError(500, "Order not deleted!");

    res.status(200).json(deletedOrder);
  });
}

module.exports = new deleteOrder();
