const Category = require("../../models/category.model");
const addCategorySchema = require("../../jsonSchema/Category/add");
const validate = require("../../lib/validate");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const { apiError } = require("../../lib/apiError");
const asyncHandler = require("../../middleware/asyncHandler");

class addCategory {
  async categoryExists(category) {
    try {
      const categoryExists = await Category.findOne({ category: category });
      if (categoryExists) throw new apiError(400, "Category aleady exists !");

      return null;
    } catch (error) {
      throw error;
    }
  }
  process = asyncHandler(async (req, res) => {
    validate(req.body, addCategorySchema);
    const { category } = req.body;

    await this.categoryExists(category);

    const newCategory = await Category.create({ category: category });
    if (!newCategory) throw new apiError(400, "Category not added !");

    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: newCategory,
    });
  });
}

module.exports = new addCategory();
