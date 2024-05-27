const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authenticateEmployee
} = require("../middleware/authMiddleware");

router.get(
  "/get",
  authenticateUser,
  authenticateEmployee,
  require("../controllers/Meal/get").process
);

router.post(
  "/add",
  authenticateUser,
  authenticateEmployee,
  require("../controllers/Meal/add").process
);

router.put(
  "/update/:id",
  authenticateUser,
  authenticateEmployee,
  require("../controllers/Meal/update").process
);

router.delete(
  "/delete",
  authenticateUser,
  authenticateEmployee,
  require("../controllers/Meal/delete").process
);

module.exports = router;
