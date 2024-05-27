const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");

router.post(
  "/add",
  authenticateUser,
  require("../controllers/Products/add").process,
);
// router.get(
//   "/get",
//   authenticateUser,
//   require("../controllers/Products/getAll").process
// );
router.get(
  "/get/:id",
  authenticateUser,
  require("../controllers/Products/getSingle").process,
);
router.delete(
  "/delete/:id",
  authenticateUser,
  require("../controllers/Products/delete").process,
);
router.put(
  "/update/:id",
  authenticateUser,
  require("../controllers/Products/update").process,
);

module.exports = router;
