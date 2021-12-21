const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];

    if (!token) {
      return res.status(401).send({ message: "You're are not authenticated " });
    }

    req.user = await jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    res.status(500).send({ error });
    console.log(error);
  }
};

module.exports = authToken;
