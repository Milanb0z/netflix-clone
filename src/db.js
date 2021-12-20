const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("SERVER_ONLINE");
  })
  .catch((error) => {
    console.log(error);
  });
