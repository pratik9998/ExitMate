const mongoose = require("mongoose");
const image = require("./image")
const Schema = mongoose.Schema;
const outToken = new Schema({
  outDate: {
    type: Date,
    required: true,
  },
  inDate: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
  },
  outImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "image",
  },
  inImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "image",
  },
});
const exp = mongoose.model("outToken",outToken);
module.exports = exp;