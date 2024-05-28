const { default: mongoose } = require("mongoose");
const monggose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Invalid email");
      }
    },
  },
  message:{
    type: String,
    required: true,
    minLength:3
  }
});

const User = mongoose.model("Message",userSchema);

module.exports = User;