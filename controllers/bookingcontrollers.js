//const hotelModel = require("../models/hotel");
const bookModel = require("../models/book");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const myModel = require('../models/space')

// landing page controller
const landingHotelPage = async (req, res) => {
  try {
    const hotels= await hotelModel.find({}).lean();
    if (hotels.length === 0)
      return res.status(404).send({ message: "no places in your platform" });
    return res.status(200).json({ data: hotels });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};

// controller for booking  a place
const bookAplace = async (req, res) => {
  const token = req.cookies.jwt;
  try {
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          res.status(404).send({ message: err.message });
        } else {
          let user = await User.findById(decodedToken.id);
          if (!user)
            res.status(404).send({
              message: "an error occured!, it seems this user does not exist",
            });
          let newBookingDocument = new bookModel({
            ...req.body,
            user: user._id,
          });
          await newBookingDocument.save();
          res.status(201).send({ data: newBookingDocument });
        }
      });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//details about a place controller function
// const hotelDetails = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const findSingleHotel = await hotelModel.findById(id).lean();
//     //const findSinglePlace = await placeModel.findOne({_id:id}).lean();
//     if (!findSinglePlace)
//       return res.status(404).send({ message: "place not found!" });
//     return res.status(200).send({ data: findSingleHotel });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send({ message: err.message });
//   }
// };

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { landingHotelPage };
