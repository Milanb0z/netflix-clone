const express = require("express");
const req = require("express/lib/request");
require("dotenv").config();
require("./db");

const app = express();

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Online");
});

app.listen(PORT, () => {
  console.log(`Server Online on PORT:${PORT}`);
});
