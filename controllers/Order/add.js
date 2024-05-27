const Order = require("../../models/order.model");
const Meal = require("../../models/meal.model");
const Product = require("../../models/product.model");
const sendOrderConfirmationMail = require("../../lib/generateMail");
const Customer = require("../../models/customer.model");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class addOrder {
  process = asyncHandler(async (req, res) => {
    const { email, orders, useCoins } = req.body;

    const items = [];
    let total = 0;
    let newOrder;
    let coinsEarned = 0;
    let rewardStatement = "";
    let discount = 0;
    const customer = await Customer.findOne(
      { email: email },
      { coins: 1, name: 1, _id: 0 },
    );
    let coins = customer.coins;
    const name = customer.name;

    //Generate Order Number
    let orderNumber = Math.floor(Math.random() * 9000) + 1000;

    //if ordering through coin and isRewardCoin = True
    if (useCoins) {
      const newMeal = await Meal.findOne({
        mealCode: orders[0].mealCode,
      });
      if (!newMeal) throw "Meal not found!";

      if (!(coins >= newMeal.price * orders[0].quantity)) {
        throw new apiError(500, "You don't have enough coins!");
      }

      total = newMeal.price * orders[0].quantity;
      items.push({
        name: newMeal.mealName,
        quantity: orders[0].quantity,
        price: newMeal.price,
        discount: discount,
        instructions: orders[0].instructions,
      });
      //Save order in database
      newOrder = await Order.create({
        email: email,
        orderNumber,
        items,
        total,
        coinsEarned,
        useCoins,
      });
      if (!newOrder) throw new apiError(500, "Order not created!");

      coins -= newMeal.price * orders[0].quantity;
      rewardStatement = `Hey ${name} this purchase was done through b&f coins, hence no b&f coins will be credited in this order.`;
    } else {
      let len = orders.length;
      for (let i = 0; i < len; i++) {
        let mealPrice = 0;

        //Meal query
        if (orders[i].isMeal) {
          const newMeal = await Meal.findOne({
            mealCode: orders[i].mealCode,
          });
          if (!newMeal) throw new apiError(400, "Meal not found!");

          newMeal.products.forEach((product) => {
            mealPrice += product.price;
            discount += product.mealDiscount;
          });

          items.push({
            name: newMeal.mealName,
            quantity: orders[i].quantity,
            price: mealPrice,
            discount: discount,
            instructions: orders[i].instructions,
          });
          coinsEarned += 2 * orders[i].quantity;
        } else {
          //Item query
          const newItem = await Product.findOne({
            productCode: orders[i].productCode,
          });
          if (!newItem) throw new apiError(400, "Item not found!");
          items.push({
            name: newItem.name,
            quantity: orders[i].quantity,
            price: newItem.price,
            discount: discount,
            instructions: orders[i].instructions,
          });

          coinsEarned += 1 * orders[i].quantity;
        }
      }

      //Update customer coins
      coins += coinsEarned;
      //Calculate total amount

      for (let i = 0; i < items.length; i++) {
        total +=
          (items[i].price - (items[i].discount / 100) * items[i].price) *
          items[i].quantity;
      }

      //Save order in database
      newOrder = await Order.create({
        email: email,
        orderNumber,
        items,
        total,
        useCoins,
        coinsEarned,
      });
      if (!newOrder) throw new apiError(400, "Order not created!");
      rewardStatement = `Congratulations ${name}, you earned ${coinsEarned} b&f coins in this order.`;
    }

    const updateCoins = await Customer.updateOne(
      { email: email },
      {
        coins: coins,
      },
    );

    if (!updateCoins) throw new apiError(500, "Coins not updated!");

    //Calculate Date and Time of the order
    let now = new Date();
    let date = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
    let time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    // Create HTML content for the email
    const html = `
  <p><strong>OrderNumber:</strong> ${orderNumber}</p>
  <p><strong>Date:</strong> ${date}</p>
  <p><strong>Time:</strong> ${time}</p>
  
  <table border="1" style="width: 100%; border-collapse: collapse; background-color: #f2f2f2; text-align: center;">
    <thead style="background-color: #d9d9d9;">
      <tr>
        <th>Sr. No</th>
        <th>Items</th>
        <th>Quantity</th>
        <th>Price/Qty</th>
        <th>Discount</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      ${items
        .map(
          (item, index) => `
        <tr style="background-color: #ffffff;">
          <td style="text-align: center;">${index + 1}</td>
          <td>${item.name}</td>
          <td style="text-align: center;">${item.quantity}</td>
          <td style="text-align: center;">$${item.price.toFixed(2)}</td>
          <td style="text-align: center;">${item.discount}%</td>
          <td style="text-align: center;">$${
            useCoins
              ? (item.price * item.quantity).toFixed(2)
              : (
                  item.price * item.quantity -
                  (item.discount / 100) * item.price * item.quantity
                ).toFixed(2)
          }</td>
        </tr>`,
        )
        .join("")}
    </tbody>
    <tfoot style="background-color: #d9d9d9; text-align: right;">
      <tr>
        <td colspan="5" align="right"><strong>Total</strong></td>
        <td style="text-align: center;"><strong>$${total.toFixed(
          2,
        )}</strong></td>
      </tr>
    </tfoot>
  </table>

  <p><Strong>${rewardStatement}</Strong></p>
  <p><strong>Thank you for ordering at Burger and Fries.</strong></p>
  <p>Please visit us again!</p>
`;

    //Send Email Confirmation
    const mailDetails = {
      from: "service@bandf.com",
      to: email,
      subject: "Order Confirmed!",
      html: html,
    };

    const orderConfirmationMail = await sendOrderConfirmationMail(mailDetails);
    if (!orderConfirmationMail) throw new apiError(500, "Email not sent!");

    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: newOrder,
    });
  });
}

module.exports = new addOrder();
