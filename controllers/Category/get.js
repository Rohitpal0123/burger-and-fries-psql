const Category = require("../../models/category.model");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class getCategory {
  process = asyncHandler(async (req, res) => {
    const category = await Category.find();
    if (!category) throw new apiError(400, "Category not found !");

    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: category,
    });
  });
}

module.exports = new getCategory();
