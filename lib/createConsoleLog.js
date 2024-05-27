const winston = require("winston");
const { combine, timestamp, json } = winston.format;

function createConsoleLog() {
  const logger = winston.createLogger({
    level: "http",
    format: combine(timestamp(), json()),
    transports: [new winston.transports.Console()],
  });

  return logger;
}

module.exports = createConsoleLog;
