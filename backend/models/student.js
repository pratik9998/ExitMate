const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const student = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile : {
        type : Buffer
    }
  },
  { timestamps: true }
);
student.statics.isvalid = async function (username,password,confirm_password) {
  if (!username)return false;
  if(username.length!= 6) return false;
  if(password !== confirm_password)
  try {
    const user = await this.findOne({ username });
    if (user) return false;
    return true;
  } catch (error) {
    console.log("error inside isvalid method", error.message);
    return false;
  }
};
student.pre("save", async function (next) {
  if (this.password.length > 20) next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const c = mongoose.model("student", student);
module.exports = c;
