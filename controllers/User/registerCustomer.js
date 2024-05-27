const Customer = require("../../models/customer.model");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class registerCustomer {
  process = asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    const coins = 0;
    const newCustomer = await Customer.create({
      name,
      email,
      coins,
    });
    if (!newCustomer) throw new apiError(500, "Customer not added!");
    res.status(200).json(newCustomer);
  });
}

module.exports = new registerCustomer();
