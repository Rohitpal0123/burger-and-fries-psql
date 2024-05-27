const Category = require("../../models/category.model");
const asyncHandler = require("../../middleware/asyncHandler");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const { apiError } = require("../../lib/apiError");
class deleteCategory {
  async categoryExists(id) {
    try {
      const categoryExists = await Category.findById({ _id: id });
      if (!categoryExists)
        throw new apiError(400, "Category does not exists !");

      return null;
    } catch (error) {
      throw error;
    }
  }
  process = asyncHandler(async (req, res) => {
    const id = req.params.id;

    await this.categoryExists(id);

    const deletedCategory = await Category.deleteOne({ _id: id });
    if (!deletedCategory) throw new apiError(400, "Category not deleted !");

    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: deletedCategory,
    });
  });
}

module.exports = new deleteCategory();
