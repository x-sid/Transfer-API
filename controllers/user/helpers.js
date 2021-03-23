const fs = require("fs");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

//writes the user data to json file
exports.saveUserData = async (data) => {
  const stringifyData = JSON.stringify(data);
  const asyncWriteFile = promisify(fs.writeFile);
  return await asyncWriteFile("./controllers/user/userDB.json", stringifyData);
};

//get the user data from json file
exports.getUserData = async () => {
  const asyncReadFile = promisify(fs.readFile);
  const jsonData = await asyncReadFile("./controllers/user/userDB.json");
  const users = await JSON.parse(jsonData);
  return users;
};

exports.generateToken = (payload, expires) => {
  const token = jwt.sign(payload,process.env.SECRET_KEY, {
    expiresIn: expires,
  });

  return token;
};
