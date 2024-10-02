const mongoose = require("mongoose");
const student = require('./student')
const url =
  "mongodb+srv://malay:1234@cluster0.t0pj9ge.mongodb.net/exitmate?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(url)
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(error));
