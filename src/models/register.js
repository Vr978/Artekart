const mongoose = require("mongoose");
const validator = require("validator");
const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength:3
  },
  email: {
    type:String,
    required:true,
    unique:true,
    validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Invalid email");
        }
      }

  },
  password: {
    type:String,
    required:true
  },
  confirmPassword: {
    type:String,
    required:true
  },
});


const Register = new mongoose.model("User",registerSchema);
module.exports = Register;
