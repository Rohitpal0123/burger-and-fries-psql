const Meal = require("../../models/meal.model");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class deleteMeal {
  process = asyncHandler(async (req, res) => {
    const { id } = req.body;

    const deletedMeal = await Meal.deleteOne({ _id: id });
    if (!deletedMeal) throw new apiError(400, "Meal not deleted!");

    res.status(200).json(deletedMeal);
  });
}

module.exports = new deleteMeal();
