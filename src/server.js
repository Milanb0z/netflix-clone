const express = require("express");
const req = require("express/lib/request");
require("dotenv").config();
require("./db");

//Router

const AuthRouter = require("./router/auth");

const app = express();

app.use(express.json());

app.use("/auth", AuthRouter);

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Online");
});

app.listen(PORT, () => {
  console.log(`Server Online on PORT:${PORT}`);
});
