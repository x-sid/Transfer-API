const jwt = require("jsonwebtoken");
require("dotenv").config();

//Check to make sure header is not undefined, if so, return Forbidden (403)
const authenticate = (req, res, next) => {
  try {
    const header =
      req.headers["authorization"] || req.body.headers["Authorization"];

    if (typeof header !== "undefined") {
      const bearer = header.split(" ");
      const token = bearer[1];

      // Verify if token is valid
      jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
          return res
            .status(403)
            .json({ success: false, message: "Invalid Token" });
        }
        req.user = decode;
        return next();
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

module.exports = authenticate;
