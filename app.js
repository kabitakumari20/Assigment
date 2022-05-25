const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
const validator = require("validator");
helper = require("./helper/helper");

mongoose
  .connect("mongodb://localhost:27017/Assigment", {
    // useCreateIndex:true,
    // useNewUrlParser:true,
    // useUnifiesTopology:true
  })
  .then(() => {
    console.log("connection is successfully");
  })
  .catch((err) => {
    console.log("no connection");
  });

const userRouter = require("./router/user");

app.use(express.json());
app.use("/users", userRouter);

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("Server is running port number 3000--");
});
