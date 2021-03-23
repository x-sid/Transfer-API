const {
  performTransaction,
  saveTransaction,
  getTransactionHistory,
} = require("./helpers");
const { saveUserData, getUserData } = require("../user/helpers");
const bcrypt = require("bcryptjs");

module.exports = class transactionService {
  static async transfer(req) {
    const users = await getUserData();

    const recipient = await users.find(
      (user) => +user.accountNumber === req.body.recipientAccountNumber
    );


    if (!recipient) {
      return { success: false, message: "Invalid account number", data: {} };
    }

    if (req.user.accountNumber === recipient.accountNumber) {
      return { success: false, message: "Invalid transaction", data: {} };
    }

    const sender = users.find(
      (user) => +user.accountNumber === +req.user.accountNumber
    );

    const { transactionPin } = sender;
    const { transactionPin: pin } = req.body;

    const match = bcrypt.compareSync(String(pin), transactionPin);

    if (!match) {
      return { success: false, message: "Invalid PIN", data: {} };
    }

    const insufficientFund = req.body.amount > sender.accountBalance;

    if (insufficientFund) {
      return { success: false, message: "Insufficient funds", data: {} };
    }

    const transactionDetails = {
      sendersName: `${sender.firstName} ${sender.lastName}`,
      sendersAccountNumber: sender.accountNumber,
      recipientName: `${recipient.firstName} ${recipient.lastName}`,
      recipientAccountNumber: req.body.recipientAccountNumber,
      amount: req.body.amount,
      description: req.body.description,
      transactionType: "Debit",
      transactionMethod: "Transfer",
      transactionStatus: "successful",
    };

    const { updatedUsers, sendersCurrentBalance } = await performTransaction(
      sender,
      recipient,
      transactionDetails,
      users
    );

    await saveUserData(updatedUsers);
    await saveTransaction(transactionDetails, { sender, recipient });

    transactionDetails.availableBalance = sendersCurrentBalance;
    return { success: true, message: "Successfull", data: transactionDetails };
  }

  static async transactionHistory(req) {
    const transactions = await getTransactionHistory();
    if (!transactions.length) {
      return { success: false, message: "No transaction found", data: {} };
    }

    const transactionHistory = transactions.filter(
      (transaction) => transaction.userId === req.user.id
    );

    if (!transactionHistory.length) {
      return { success: false, message: "No transaction found", data: {} };
    }
    return { success: true, message: "Success", data: transactionHistory };
  }
};
