const fs = require("fs");
const { promisify } = require("util");
module.exports = async () => {
  const transferData = [];
  const asyncTransferWriteFile = promisify(fs.writeFile);
  await asyncTransferWriteFile("./tests/transactionDB.json", String(...transferData));

  const userData = [];
  const asyncWriteFile = promisify(fs.writeFile);
  return await asyncWriteFile("./tests/userDB.json", String(...userData));
};
