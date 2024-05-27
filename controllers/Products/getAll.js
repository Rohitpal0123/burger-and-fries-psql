// const Product = require("../../models/product.model");
// const redis = require("redis").createClient();
// const RESPONSE_MESSAGE = require("../../lib/responseCode");
// const asyncHandler = require("../../middleware/asyncHandler");
// const { apiError } = require("../../lib/apiError");
//class getAllProduct {
  // process = asyncHandler(async (req, res) => {
  //   let results;
  //   let isCached = false;
  //   const getFromRedis = (key) => {
  //     return new Promise((resolve, reject) => {
  //       redis.get(key, (err, reply) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(reply);
  //         }
  //       });
  //     });
  //   };
  //   const cacheResult = await getFromRedis("products");
  //   if (cacheResult) {
  //     isCached = true;
  //     results = JSON.parse(cacheResult);
  //   } else {
  //     results = await Product.find();
  //     if (!results) throw new apiError(400, "Products not found !");
  //     await redis.set("products", JSON.stringify(results));
  //   }
  //   res.status(200).send({
  //     type: RESPONSE_MESSAGE.SUCCESS,
  //     data: results,
  //   });
  // });
}


// module.exports = new getAllProduct();
