const fs = require("fs");
const { promisify } = require("util");
const { v4: uuidv4 } = require("uuid");


//get transaction history data from json file
exports.getTransactionHistory = async () => {
  if (process.env.NODE_ENV === "development") {
    try {
      const asyncReadFile = promisify(fs.readFile);
      const jsonData = await asyncReadFile("./database/transactionDB.json");
      return JSON.parse(jsonData);
    } catch (error) {
      return [];
    }
  }

  try {
    const asyncReadFile = promisify(fs.readFile);
    const jsonData = await asyncReadFile("./tests/transactionDB.json");
    return JSON.parse(jsonData);
  } catch (error) {
    return [];
  }
};

exports.performTransaction = async (
  sender,
  recipient,
  transactionDetails,
  users
) => {
  //Debit senders account
  const debit = +sender.accountBalance - +transactionDetails.amount;
  const sendersCurrentBalance = debit;

  //Credit recievers account
  const credit = +recipient.accountBalance + +transactionDetails.amount;
  const recipientCurrentBalance = credit;

  recipient.accountBalance = recipientCurrentBalance;
  sender.accountBalance = sendersCurrentBalance;

  const updatedUsers = await users.filter(
    (user) => user.id !== recipient.id && user.id !== sender.id
  );

  [sender, recipient].map(async (updatedUser) => {
    await updatedUsers.push(updatedUser);
  });

  return { updatedUsers, sendersCurrentBalance };
};

exports.saveTransaction = async (transactionDetails, users) => {
  const sendersReciept = Object.assign({}, transactionDetails);
  const recipientReciept = Object.assign({}, transactionDetails);

  const { accountBalance: sendersAccountBalance, id: sendersId } = users.sender;

  sendersReciept.id = uuidv4();
  sendersReciept.userId = sendersId;
  sendersReciept.userId = sendersId;
  sendersReciept.availableBalance = sendersAccountBalance;

  const {
    id: recipientsId,
    accountBalance: recipientAccountBalance,
  } = users.recipient;

  recipientReciept.id = uuidv4();
  recipientReciept.userId = recipientsId;
  recipientReciept.transactionType = "Credit";
  recipientReciept.userId = recipientsId;
  recipientReciept.availableBalance = recipientAccountBalance;

  const data = [sendersReciept, recipientReciept];

  if (process.env.NODE_ENV === "development") {
    const stringifyData = JSON.stringify(data);
    const asyncWriteFile = promisify(fs.writeFile);
    await asyncWriteFile("./database/transactionDB.json", stringifyData);
    return;
  }

  const stringifyData = JSON.stringify(data);
  const asyncWriteFile = promisify(fs.writeFile);
  await asyncWriteFile("./tests/transactionDB.json", stringifyData);
  return;
};
