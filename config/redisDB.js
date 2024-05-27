const redis = require("redis");

const connectRedis = async () => {
  try {
    const redisClient = redis.createClient();
    redisClient.on("connect", () => {
      console.log("Redis server connection established successfully");
    });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    process.exit(1);
  }
};

module.exports = connectRedis;
