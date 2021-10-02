const Adminreg = require("../models/adminreg");
const jwt = require("jsonwebtoken");
let emailRegexVal =
  /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
const hotels = require("../models/space");

const maxAge = 24 * 60 * 60 * 1000;
const createJwt = (userType) => {
  return jwt.sign({ userType}, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const adminregSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    let adminReg = await Adminreg.findOne({ email: email }).lean();
    if (adminReg)
      return res.status(400).json({
        message: "email already exists",
        data: adminReg,
      });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "password is at least six characters" });
    const admin = await Adminreg.create(req.body);
    //sign token
    const token = createJwt(admin.userType);
    return res.status(201).json({
      message: "user sucessfully created",
      data: admin,
      token: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ data: err.message });
  }
};

const adminregLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Adminreg.login(email, password);
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "password is at least six characters" });
    if (!admin)
      return res
        .status(404)
        .json({ message: "email or password is incorrect" });
    const token = createJwt(admin.userType);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    return res.status(200).json({ token,admin: admin, message: "login successful!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const approveBusiness = async (req, res) => {
  try {
    const id = req.params.id;
    let findOneHotel = await hotels.findById(id);
    if (!findOneHotel) return res.status(404).json({ error: "hotel not found" });
    await hotels.findOneAndUpdate(
      { _id: id },
      { verified: true },
      { new: true, runValidators: true },
      (err, docs) => {
        if (err) console.error(err);
        console.log(docs);
      }
    );
    return res.status(200).json({message:findOneHotel})
    
  } catch (err) {
    console.error(err)
    return res.status(500).json({message:err.message})
    
  }
 
};

module.exports = { adminregSignUp, adminregLogin,approveBusiness };
