const userSchema = require("../controllers/user/schema");
const transactionSchema = require("../controllers/transaction/schema");

exports.validate = {
  async signup(req, res, next) {
    try {
      const result = await userSchema.signup.validateAsync(req.body);
      if (result.error) {
        const { error } = result;
        return res.status(422).json({ success: false, error });
      }
      return next();
    } catch (error) {
      if (error.isJoi === true) {
        return res.status(422).json({ success: false, message: error.message });
      }
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
  },

  async login(req, res, next) {
    try {
      const result = await userSchema.login.validateAsync(req.body);
      if (result) {
        return next();
      }
    } catch (error) {
      if (error.isJoi === true) {
        return res.status(422).json({ success: false, message: error.message });
      }
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
  },

  async transfer(req, res, next) {
    try {
      const result = await transactionSchema.transfer.validateAsync(req.body);
      if (result) {
        return next();
      }
    } catch (error) {
      if (error.isJoi === true) {
        return res.status(422).json({ success: false, message: error.message });
      }
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
  },
};
