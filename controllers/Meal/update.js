const Meal = require("../../models/meal.model");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class updateMeal {
  process = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;

    const updatedMeal = await Meal.updateOne({ _id: id }, update);
    if (updatedMeal.modifiedCount != 1)
      throw new apiError(400, "Meal not updated!");

    res.status(200).json(updatedMeal);
  });
}

module.exports = new updateMeal();
