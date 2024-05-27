const Product = require("../../models/product.model");
const validate = require("../../lib/validate");
const addProductSchema = require("../../jsonSchema/Product/add");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class addProduct {
  process = asyncHandler(async (req, res) => {
    validate(req.body, addProductSchema);
    const productData = req.body;

    const newProduct = await Product.create(productData);
    if (!newProduct) throw new apiError(500, "Product not added !");

    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: newProduct,
    });
  });
}

module.exports = new addProduct();
