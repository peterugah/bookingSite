const router = require("express").Router();
const {
  landingHotelPage } = require("../controllers/bookingcontrollers");

router.get("/booking-page", landingHotelPage);

//router.get("/space-details/:id", spaceDetails);

 module.exports = router;
