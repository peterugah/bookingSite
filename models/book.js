const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({
  checkIn: {
    type: Object,
    default: new Date(),
    required: true,
  },

  checkout: {
    type: Object,
    default: new Date(),
    required: true,
  },

  noOfDays: {
    type: Number,
    required: true,
  },
  pricePerday: {
    // type:String
    /*
    type: mongoose.Schema.Types.ObjectId,
    ref: "placeSchema",
    */
    type: Number,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  user: {
    //type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: "userSchema",
  },
});

const bookModelSchema = mongoose.model("bookSchema", bookSchema);
module.exports = bookModelSchema;

// ACID compliance
// A - atomicity
//C - consistency
// I - INTEGRITY
// d - DURABILITY
//
