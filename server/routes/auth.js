const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const verifyToken = require("../middleware/auth");

//Method: Get
//Route: api/auth
//desc: Check user is logged in?
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found!" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route POST api/auth/register
//@desc Register user
router.post("/register", async (req, res) => {
  const { username, password, numberPhone } = req.body;
  const regex = /^0\d{9}$/;

  if (!username || !password || !numberPhone)
    return res.status(400).json({
      success: false,
      message: "Missing username or password or number phone!",
    });

  try {
    const user = await User.findOne({ username: username });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username has existed" });

    if (!regex.test(numberPhone))
      return res
        .status(400)
        .json({ success: false, message: "Number phone is not valid!!" });

    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      password: hashedPassword,
      numberPhone,
    });
    await newUser.save();

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "Sign in successfully!",
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route POST api/auth/login
//@desc Login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Username not exist" });

    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    //all good
    res.json({
      success: true,
      message: "login successfully",
      userId: user._id,
      accessToken: accessToken,
    });
  } catch (error) {}
});
module.exports = router;
