// const cron = require("node-cron");
const Order = require("../models/order.model");
const generateMail = require("../lib/generateMail");
const User = require("../models/user.model");
const cron = require("node-cron")

async function getLatestSevenDaysOffer() {

    try {
        
        const getLatestOrder = await Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              },
            },
          },
          {
            $project:
              /**
               * specifications: The fields to
               *   include or exclude.
               */
              {
                _id: 0,
                email: 1,
                items: 1,
              },
          },
          {
            $group:
              /**
               * _id: The id of the group.
               * fieldN: The first field name.
               */
              {
                _id: "$email",
                latestOrder: {
                  $first: "$$ROOT",
                },
              },
          },
          {
            $replaceRoot:
              /**
               * replacementDocument: A document or string.
               */
              {
                newRoot: {
                  newRoot: "$latestOrder",
                },
              },
          },
          {
            $group:
              /**
               * _id: The id of the group.
               * fieldN: The first field name.
               */
              {
                _id: "$newRoot.email",
                items: {
                  $push: "$newRoot.items",
                },
              },
          },
          {
            $unwind:
              /**
               * path: Path to the array field.
               * includeArrayIndex: Optional name for index.
               * preserveNullAndEmptyArrays: Optional
               *   toggle to unwind null and empty values.
               */
      
              "$items",
          },
        ]);
        console.log("🚀 ~ getLatestOrder:", getLatestOrder)
      
        for (let i = 0; i < getLatestOrder.length; i++) {
          const getUser = await User.findOne({ email: getLatestOrder }).select(
            "userName -_id"
          );
          console.log("🚀 ~ getUser:", getUser)
          const latestFoodName = getLatestOrder[i].items[0].name;
          console.log("🚀 ~ latestFoodName:", latestFoodName)
          
          const mailOptions = {
            from: "service@bandf.com",
            to: getLatestOrder[0]._id,
            subject: "Take a break and get some delicious mind boggling food",
            text: `Hey ${getUser.userName}, don't you miss having ${latestFoodName} ? So come on and have it right now to avail amazing offers on your order`,
          };
          console.log("🚀 ~ mailOptions:", mailOptions)
      
          const sendReminderEmail = await generateMail(mailOptions);
          console.log("🚀 ~ sendReminderEmail:", sendReminderEmail)
          if (!sendReminderEmail) throw "Seven Days reminder not sent!";
        }
    } catch (error) {
        console.log("🚀 ~ error:", error)
        process.exit(1);
    }
}

const job = cron.schedule("* * * * *", getLatestSevenDaysOffer);

module.exports = job;
