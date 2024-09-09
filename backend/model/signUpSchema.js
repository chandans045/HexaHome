// signUpSchema.js
const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const SignUp = mongoose.model("SignUp", signUpSchema);

module.exports = SignUp;
