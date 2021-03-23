const { getUserData } = require("./helpers");
const UserService = require("../../services/userServices");

exports.userSignUp = async (req, res) => {
  try {
    let userDetails = req.body;
    userDetails.email = req.body.email.toLowerCase();

    const users = await getUserData();

    const findExist = await users.find(
      (user) => user.email === userDetails.email
    );

    if (findExist) {
      return res
        .status(400)
        .json({ success: false, messsage: "User already exists", data: {} });
    }

    const { success, message, data } = await UserService.create(
      userDetails,
      users
    );
    return res.status(201).json({ success, message, data });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, messsage: "Someting went wrong" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    let loginDetails = req.body;
    loginDetails.email = req.body.email.toLowerCase();

    let existUsers = await getUserData();

    const user = await existUsers.find(
      (user) => user.email === loginDetails.email
    );

    if (!user) {
      return res
        .status(400)
        .json({ success: false, messsage: "Invalid email or password" });
    }

    const { success, message, data } = await UserService.login(
      loginDetails,
      user
    );

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
