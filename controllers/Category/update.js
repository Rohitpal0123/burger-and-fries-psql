const Category = require("../../models/category.model");
const validate = require("../../lib/validate");
const updateCategorySchema = require("../../jsonSchema/Category/update");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class updateCategory {
  async categoryExists(id) {
    try {
      const categoryExists = await Category.find({ _id: id });
      if (categoryExists == null)
        throw new apiError(400, "Category not found !");

      return null;
    } catch (error) {
      throw error;
    }
  }
  process = asyncHandler(async (req, res) => {
    validate(req.body, updateCategorySchema);
    const id = req.params.id;
    const category = req.body;

    await this.categoryExists(id);

    const updatedCategory = await Category.updateOne({ _id: id }, category);
    if (updatedCategory.modifiedCount != 1)
      throw new apiError(400, "Category not Updated !");

    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: updatedCategory,
    });
  });
}

module.exports = new updateCategory();
