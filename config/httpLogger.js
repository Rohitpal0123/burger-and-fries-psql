const morgan = require("morgan");
const createConsoleLog = require("../lib/createConsoleLog");

const logger = createConsoleLog();

const requestLogger = morgan("tiny", {
  stream: {
    write: (message) => logger.http(message.trim()),
  },
});

console.log("Morgan is logging.....");

module.exports = requestLogger;
