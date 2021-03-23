const router = require("express").Router();
const userRoutes = require("./user");
const transactionRoutes = require("./transaction");

router.use("/users", userRoutes);
router.use("/transactions", transactionRoutes);

module.exports = router