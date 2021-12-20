const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Models
const User = require("../models/user.model");

const router = new express.Router();

// User Registration
router.post("/register", async (req, res) => {
  const { username, email, password, profilePic } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePic,
    });

    const savedUser = await newUser.save();

    res.send(savedUser);
  } catch (error) {
    res.status(500).send({ error });
    console.log(error);
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const savedUser = await User.findOne({ email });

    if (!savedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, savedUser.password);

    if (!isMatch) {
      return res.status(401).send({ message: "Invalid Credentials" });
    }

    res.send(savedUser);
  } catch (error) {
    res.status(500).send({ error });
    console.log(error);
  }
});

module.exports = router;
