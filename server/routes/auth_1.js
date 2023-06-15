const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config();
app.use(cookieParser());

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashPass,
    });

    //generate a tken for user and send it
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    newUser.token = token;
    //newUser.password = undefined;

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    // const { email, password } = req.body;
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("wrong credentials");

    // const validate = await bcrypt.compare(req.body.password, user.password);
    // !validate && res.status(400).json("wrong credentials");

    //match password
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      user.token = token;
      //user.password = undefined;

      //cookie section
      const options = {
        expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        // httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
