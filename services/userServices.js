const { saveUserData, generateToken } = require("../controllers/user/helpers");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

module.exports = class UserService {
  static async create(user, users) {
    const userData = user;
    const now = new Date();

    //hash password and transaction pin
    const { transactionPin } = userData;
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const hashedPin = await bcrypt.hash(transactionPin.toString(), 10);
    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);

    userData.id = uuidv4();
    userData.accountNumber = accountNumber;
    userData.password = hashedPassword;
    userData.transactionPin = hashedPin;
    userData.accountBalance = 5000;
    userData.isActivated = true;
    userData.createdAt = userData.updatedAtnow = now;

    //append the user data
    users.push(userData);

    //save the new user data
    await saveUserData(users);
    return { success: true, message: "User signup successfully",data:{accountNumber} };
  }

  static async login(loginDetails, user) {
    const { password } = loginDetails;
    // check if users password matches the password on the db
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return {
        success: false,
        message: "Incorrect Email or Password",
        data: {},
      };
    }

    const payload = {
      id: user.id,
      accountNumber: user.accountNumber,
    };

    const token = generateToken(payload, "1d");
    const { firstName, lastName, accountNumber, accountBalance, id } = user;

    return {
      success: true,
      message: "Success",
      data: { id, firstName, lastName, accountNumber, accountBalance, token },
    };
  }
};
