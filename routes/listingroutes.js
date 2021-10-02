const router = require('express').Router();
const listingController = require('../controllers/listingcontrollers')
router.post('/book-hotel',bookHotelController);

module.exports = router