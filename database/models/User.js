"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.INTEGER,
      password: DataTypes.INTEGER,
      accountNumber: DataTypes.INTEGER,
      transactionPin: DataTypes.INTEGER,
      accountBalance: DataTypes.INTEGER,
      isActivated: DataTypes.BOOLEAN,
    },
    {}
  );
  user.associate = function (models) {
    // associations can be defined here
    hasMany.models(transactonHistory);
  };
  return user;
};
