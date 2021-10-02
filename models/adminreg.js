const mongoose = require ('mongoose')
const bcrypt = require('bcrypt');
let emailRegexVal =  /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
const adminregSchema = mongoose.Schema({
  email: { type: String,
    unique: true,
    validate: {
      validator: function(v) {
        return emailRegexVal.test(v);
      },
      message: (mail) => `${mail.value} is not a valid email address !`,
    },
    required: [true, "Please enter your email address"] },

password : {
type : String,
required : true,
},
userType:{
    type : String,
    default : "Admin"
}

});

// fire a mongoose hook to hash passwords before doc saved to db
adminregSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  adminregSchema.statics.login = async function (email, password) {
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
  
const adminregModelSchema = mongoose.model('adminregSchema', adminregSchema);
module.exports = adminregModelSchema;

