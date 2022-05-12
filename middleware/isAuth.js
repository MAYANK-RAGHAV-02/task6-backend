const JWT = require("jsonwebtoken");
const DOTENV = require("dotenv");
DOTENV.config();

//  ########################### AUTHENTICATION MIDDLEWARE #####################
module.exports = async function (req, res, next) {
  let token = req.header("Authorization");
  // if token is undefined or null
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization required1", success: false });
  }
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length).trimLeft();
  }
  if (token === "undefined") {
    return res
      .status(401)
      .json({ message: "Authorization required3", success: false });
  }

  try {
    const verified = JWT.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Authorization required2", success: false });
  }
};
