const express = require("express");
require("dotenv").config();
require("./db");

//Router

const AuthRouter = require("./router/auth.route");
const MoviesRouter = require("./router/movies.route");

const app = express();

app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/movie", MoviesRouter);

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Online");
});

app.listen(PORT, () => {
  console.log(`Server Online on PORT:${PORT}`);
});
