const router = require("express").Router();
const transactionCtrl = require("../controllers/transaction/controller");
const authenticate = require("../middleware/auth");
const { validate } = require("../middleware/validator");

router.post(
  "/transfer",
  validate.transfer,
  authenticate,
  transactionCtrl.transfer
);

router.get("/history", authenticate, transactionCtrl.transactionHistroy);
module.exports = router;
