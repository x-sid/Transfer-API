const fs = require("fs");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//writes the user data to json file
exports.saveUserData = async (data) => {
  if (process.env.NODE_ENV === "development") {
    const stringifiedData = JSON.stringify(data);
    const asyncWriteFile = promisify(fs.writeFile);
    return await asyncWriteFile("./database/userDB.json", stringifiedData);
  }

  const stringifiedData = JSON.stringify(data);
  const asyncWriteFile = promisify(fs.writeFile);
  return await asyncWriteFile("./tests/userDB.json", stringifiedData);
};

//get the user data from json file
exports.getUserData = async () => {
  if (process.env.NODE_ENV === "development") {
    try {
      const asyncReadFile = promisify(fs.readFile);
      const jsonData = await asyncReadFile("./database/userDB.json");
      const users = await JSON.parse(jsonData);
      return users;
    } catch (error) {
      return []
    }
  }

  try {
    const asyncReadFile = promisify(fs.readFile);
    const jsonData = await asyncReadFile("./tests/userDB.json");
    const users = await JSON.parse(jsonData);
    return users;
  } catch (error) {
    return []
  }
};

exports.generateToken = (payload, expires) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: expires,
  });

  return token;
};
