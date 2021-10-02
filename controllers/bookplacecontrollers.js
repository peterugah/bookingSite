const bookModel = require("../models/book");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const placeModel = require("../models/space");
const mongoose = require("mongoose");

function convertDates(nDays, checkIn) {
  // let checkOutVar = new Date()
  checkIn = new Date();
  let checkOutMili = checkIn.setDate(new Date().getDate() + nDays);
  let checkOutDate = new Date(checkOutMili);
  return checkOutDate;
}
// controller for booking  a place
// const bookAplace = async (req, res) => {
//   const token = req.headers.cookie
//   console.log(token)
//   try {
//      if (token) {
//       jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
//        if (err) {
//           res.status(404).send({ message: err.message });
//         } else {
//           let user = await Use

const getUserId = async (req, res,next) => {
  const token = req.headers.jwt;
  try {
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res
        .status(500)
        .send({ message: "an error occurred, please login to try again" });
    }
    let user = await User.findById(decodedToken.id);
    console.log(user);
    if (!user)
      return res
        .status(401)
        .send({ message: "only regular users can book hotels!" });

    return user._id;
    next()
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};
// landing page controller
const bookAplace = async (req, res) => {
  try {
    const places = await placeModel.find({ verified: true }).lean();
    // if (places.length === 0)
    //   return res.status(404).send({
    //     message: "an error occured!, it seems this hotels are not available",
    //   });
    let newBookingDocument = new bookModel({
      ...req.body,
      checkOut: convertDates(req.body.noOfDays, req.body.checkIn),
      pricePerDay: req.body.pricePerDay,
      totalAmount: req.body.totalAmount,
      user: mongoose.Types.ObjectId(req.body.user)
      // totalAmount: Number(req.body.pricePerDay) * Number(req.body.noOfDays),
    });
    await newBookingDocument.save();
    res.status(201).send({
      data: newBookingDocument,
      success: "booked successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = { bookAplace, getUserId };
