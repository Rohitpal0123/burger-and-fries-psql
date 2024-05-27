const Meal = require("../../models/meal.model");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class getMeal {
  process = asyncHandler(async (req, res) => {
    const meals = await Meal.find();
    if (!meals) throw new apiError(400, "Meal not found!");

    res.status(200).json(meals);
  });
}

module.exports = new getMeal();
