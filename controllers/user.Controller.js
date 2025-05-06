const User = require("../models/User.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerAccount = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isExist = await User.findOne({ email });
    if (isExist)
      res.json({ message: "A user with this email is already exist", success: false });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ success: true, user: newUser, message: "User created successfully" });
  } catch (error) {
    res.json({ success: false, message: "Internal server error" });
  }
};

const loginAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res
        .status(200)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = await jwt.sign({ email: user.email }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });
    console.log(token);

    res.status(200).json({ success: true, token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
    registerAccount,
  loginAccount,
};
