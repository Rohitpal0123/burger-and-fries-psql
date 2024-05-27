const winston = require("winston");
const { combine, timestamp, json } = winston.format;

function createFileLog() {
  try {
    const logger = winston.createLogger({
      level: "info",
      format: combine(timestamp(), json()),
      transports: [
        new winston.transports.File({
          filename: "./log/accessLog.log",
        }),
      ],
    });
    if (!logger) throw "User not logged!";

    return logger;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    throw error;
  }
}

module.exports = createFileLog();
