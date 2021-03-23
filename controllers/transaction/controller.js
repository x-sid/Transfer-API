const transactionService = require("./services");

exports.transfer = async (req, res) => {
  try {
    const { success, message, data } = await transactionService.transfer(req);
    if (!success) {
      return res.status(400).json({ success, message, data });
    }
    return res.status(200).json({ success, message, data });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, messsage: "Someting went wrong" });
  }
};

exports.transactionHistroy = async (req, res) => {
  try {
    const {
      success,
      message,
      data,
    } = await transactionService.transactionHistory(req);
    if (!success) {
      return res.status(404).json({ success, message, data });
    }
    return res.status(200).json({ success, message, data });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, messsage: "Someting went wrong" });
  }
};
