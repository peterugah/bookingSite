const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let emailRegexVal = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
const SpaceSchema = new mongoose.Schema({
  spacename: {
    type: String,
    required: true,
    max: 200,
  },

  distanceToClient:{
    type:Number,
  },

  phonenumber: {
    type: String,
    required: true,
    unique: true,
  },

  location: {
    type: String,
    required: true,
  },

  City: {
    type: String,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
  },

  yearEstablished: {
    type: Number,
    required: true,
  },

  AverageNoOfVisitorPerYear: {
    type: Number,
    required: true,
  },
  NoOfBed :{
    type: Number,
  },
  Ratings:{
    type : Number,
    enum :[1,2,3,4,5],
  },
  Images:{
type :"string"
  },
  visible :{
    type : Boolean
  },
  Available: {
    type:String,
    default:"yes"
  },
  verified:{
    type:Boolean,
    default:false
  }

});

module.exports = mongoose.model("Space", SpaceSchema);
// module.exports = SpaceModelSchema;
