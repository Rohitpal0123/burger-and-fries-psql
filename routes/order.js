const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authenticateEmployee,
  authenticateCustomer,
} = require("../middleware/authMiddleware");

router.get("/get", require("../controllers/Order/get").process);

router.post(
  "/add",
  authenticateUser,
  authenticateEmployee,
  authenticateCustomer,
  require("../controllers/Order/add").process,
);

router.post(
  "/orderWithRewardcoins",
  authenticateUser,
  authenticateEmployee,
  authenticateCustomer,
  require("../controllers/Order/add").process,
);

router.put(
  "/update/:id",
  authenticateUser,
  authenticateEmployee,
  require("../controllers/Order/update").process,
);

router.delete(
  "/delete",
  authenticateUser,
  authenticateEmployee,
  require("../controllers/Order/delete").process,
);

module.exports = router;
