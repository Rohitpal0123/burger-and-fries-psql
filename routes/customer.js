const express = require("express");
const router = express.Router();

router.post(
  "/register",
  require("../controllers/User/registerCustomer").process,
);

module.exports = router;
