const USER = require("../model/user");
const BCRYPT = require("bcrypt");
const JWT = require("jsonwebtoken");
const signUp = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    let password = req.body.password;
    const role = req.body.role;
    password = await BCRYPT.hash(password, 12);
    const userAlready = await USER.findOne({ email: email });
    if (userAlready) {
      return res.status(409).json({
        message: "Email already registered",
        success: false,
      });
    }

    const user = await new USER({
      name,
      email,
      password,
      role,
    });

    await user.save();
    res.status(200).json({
      message: "Account created successfully",
      success: true,
      user,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error, Try later",
      success: false,
    });
    console.log(e);
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    let user = await USER.findOne({ email: email });
    if (!user) {
      res.status(404).json({
        message: "Invalid password or username",
        success: false,
      });
      return;
    }
    const doMatch = await BCRYPT.compare(password, user.password);
    if (!doMatch) {
      res.status(404).json({
        message: "Invalid password or username ",
        success: false,
      });
      return;
    }

    let logeduser = user;
    const token = JWT.sign(
      {
        email: logeduser.email,
        userId: logeduser._id,
        role: logeduser.role,
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      message: "Loged In successfully",
      success: true,
      token: token,
      userId: logeduser._id.toString(),
      role: logeduser.role,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal Server Error, Try later", success: false });
    console.log(e);
  }
};

module.exports = {
  signUp,
  login,
};
