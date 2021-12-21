const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const authToken = require("../middleware/auth");

const router = express.Router();

router.put("/:id", authToken, async (req, res) => {
  if (req.user !== req.params.id || !req.user.isAdmin) {
    return;
  }
  try {
    res.send({ message: "Changed" });
  } catch (error) {
    res.status(500).send({ error });
    console.log(error);
  }
});

router.delete("/:id", authToken, async (req, res) => {
  if (req.user._id !== req.params.id || !req.user.isAdmin) {
    return;
  }
  const { password } = req.body;
  try {
    const savedUser = User.findById(req.user._id);
  } catch (error) {
    res.status(500).send({ error });
    console.log(error);
  }
});

module.export = router;
