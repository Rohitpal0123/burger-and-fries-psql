const Product = require("../../models/product.model");
const asyncHandler = require("../../middleware/asyncHandler");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const { apiError } = require("../../lib/apiError");
class deleteProduct {
  async productExists(id) {
    try {
      const productExists = await Product.findOne({ _id: id });
      if (!productExists) throw "Product doesn't exist !";

      return null;
    } catch (error) {
      throw error;
    }
  }
  process = asyncHandler(async (req, res) => {
    const id = req.params.id;

    await this.productExists(id);

    const deletedProduct = await Product.deleteOne({ _id: id });
    if (deletedProduct.deletedCount != 1)
      throw new apiError(500, "Product not deleted !");

    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: deletedProduct,
    });
  });
}

module.exports = new deleteProduct();
