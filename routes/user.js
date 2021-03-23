const router = require("express").Router();
const userCtrl = require("../controllers/user/controller");
const {validate} = require("../middleware/validator")

router.post("/signup",validate.signup,userCtrl.userSignUp);
router.post("/login",validate.login, userCtrl.userLogin);

module.exports = router;
