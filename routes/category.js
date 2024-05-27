const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");

router.post(
  "/add",
  authenticateUser,
  require("../controllers/Category/add").process
);
router.get(
  "/get",
  authenticateUser,
  require("../controllers/Category/get").process
);
router.put(
  "/update/:id",
  authenticateUser,
  require("../controllers/Category/update").process
);
router.delete(
  "/delete/:id",
  authenticateUser,
  require("../controllers/Category/delete").process
);

module.exports = router;
