const User = require("../models/user");
const jwt = require("jsonwebtoken");
//const placeModel = require('../models/place');
//handle errors

//create json  web token
const maxAge = 24 * 60 * 60 * 1000;
const createJwt = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const userSignUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    //sign token
    const token = createJwt(user._id);
    return res.status(201).json({
      error: false,
      message: "created successful",
      data: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ data: err.message });
  }

  // incorrect email
  //     if (err.message === 'incorrect email'){
  //         errors.email = 'That email is incorrect'
  //     }

  //     //duplicate email error
  //     if (err.code ===11000){
  //         errors.email = 'that email is already registered';
  //         return errors;
  //     }
  //     //validation error

  //     if (err.message.includes('user validation failed')){
  //        // console.log(err);
  //         Object.values(err.errors).forEach(({properties})=>{
  // erors[properties.path]= properties.message;
  //         });

  //     }
  //     return errors;
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    if (!user) return res.status(404).json({ message: "account not found" });
    const token = createJwt(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    return res.status(200).json({ user: user, message: "login successful!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

//ss code
//200 -success
//300 -redirect
//400 -client error
//500 -server error

module.exports = {
  userLogin,
  userSignUp,
};