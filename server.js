const express = require("express");
const cors = require("cors");
const job = require("./cronJob/latestOrderNotification")
const connectDB = require("./config/db");
const requestLogger = require("./config/httpLogger");
// const connectRedis = require("./config/redisDB");
const cookieParser = require("cookie-parser");

require("dotenv").config();

//connect to database
connectDB();
// connectRedis();
job.start();

//Initialize Express application
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Initialize winston and morgan logger
app.use(requestLogger);

//Consume API endpoint
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const orderRouter = require("./routes/order");
const employeeRouter = require("./routes/employee");
const managerRouter = require("./routes/manager");
const roleRouter = require("./routes/role");
// const bulkUploadRouter = require("./routes/bulkUpload");
const mealRouter = require("./routes/meal");
const customerRouter = require("./routes/customer");

app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use("/employee", employeeRouter);
app.use("/manager", managerRouter);
app.use("/role", roleRouter);
// app.use("/bulkUpload", bulkUploadRouter);
app.use("/meal", mealRouter);
app.use("/customer", customerRouter);
app.use("/", (req, res) => {
  res.send("Welcome to burger & fries");
});

//Create PORT and host express server on the same
const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});

// module.exports = redisClient;
