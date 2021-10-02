const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let emailRegexVal = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 200,
  },

  email: { type: String,
    unique: true,
    validate: {
      validator: function(v) {
        return emailRegexVal.test(v);
      },
      message: (mail) => `${mail.value} is not a valid email address !`,
    },
    required: [true, "Please enter your email address"] },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  phonenumber: {
    type: String,
    required: true,
    unique: true,
  },

  country: {
    type: String,
    required: true,
  },
  userRole:{
    type:String,
    default:"user"
  }
});

// fire a mongoose hook to hash passwords before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const userAuthSchema = mongoose.model("userSchema", userSchema);
module.exports = userAuthSchema;
