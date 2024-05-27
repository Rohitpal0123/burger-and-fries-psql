const Product = require("../../models/product.model");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class getSingleProduct {
  process = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const product = await Product.findOne({ _id: id });
    if (!product) throw new apiError(400, "Product not found !");

    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: product,
    });
  });
}

module.exports = new getSingleProduct();
