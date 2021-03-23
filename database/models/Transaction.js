"use strict";
module.exports = (sequelize, DataTypes) => {
  const transactionHistory = sequelize.define(
    "transactionHistory",
    {
      userId: DataTypes.STRING,
      sendersName: DataTypes.STRING,
      sendersAccountNumber: DataTypes.INTEGER,
      recipientName: DataTypes.STRING,
      recipientAccountNumber: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      description: DataTypes.STRING,
      availableBalance: DataTypes.INTEGER,
      transactionType: {
        type: DataTypes.ENUM,
        values: ["Debit", "Credit"],
      },
      transactionMethod: {
        type: DataTypes.ENUM,
        values: ["Transfer", "USSD", "POS", "ATM"],
      },
      transactionStatus: {
        type: DataTypes.ENUM,
        values: ["Successful", "failed"],
      },
    },
    {}
  );
  transactionHistory.associate = function (models) {
    // associations can be defined here
    transactionHistory.belongsTo(models.user, {
      foreignKey: "userId",
    });
  };
  return transactionHistory;
};
