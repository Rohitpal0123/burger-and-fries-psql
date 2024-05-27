const Product = require("../../models/product.model");
const validate = require("../../lib/validate");
const updateProductSchema = require("../../jsonSchema/Product/update");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class updateProduct {
  async productExists(id) {
    try {
      const productExists = await Product.findOne({ _id: id });
      if (!productExists) throw "Product doesn't exists !";

      return null;
    } catch (error) {
      throw error;
    }
  }
  process = asyncHandler(async (req, res) => {
    validate(req.body, updateProductSchema);

    const id = req.params.id;
    const update = req.body;

    await this.productExists(id);

    const updateProduct = await Product.updateOne({ _id: id }, update);
    if (updateProduct.modifiedCount != 1)
      throw new apiError(500, "Failed to update product !")();

    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: updateProduct,
    });
  });
}

module.exports = new updateProduct();
