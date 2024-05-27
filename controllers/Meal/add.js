const Meal = require("../../models/meal.model");
const Product = require("../../models/product.model");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class addMeal {
  process = asyncHandler(async (req, res) => {
    const { mealNumber, mealName, mealCode, products } = req.body;

    for (let i = 0; i < products.length; i++) {
      const productCode = products[i];
      const product = await Product.findOne({ productCode: productCode });
      products[i] = product;
    }

    let price = 0;
    products.forEach((product) => {
      price += product.price;
    });

    const newMeal = await Meal.create({
      mealNumber,
      mealName,
      mealCode,
      products,
      price,
    });
    if (!newMeal) throw new apiError(400, "Meal not created!");

    res.status(200).json(newMeal);
  });
}
module.exports = new addMeal();
