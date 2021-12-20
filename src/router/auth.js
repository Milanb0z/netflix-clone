const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");

const router = new express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password, profilePic } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    console.log(hashedPassword);

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

module.exports = router;
