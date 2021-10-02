const router = require("express").Router();
const bookPlaceController = require("../controllers/bookplacecontrollers");
const {requireAuth} = require('../middleware/authmiddleware')
const {getUserId} = require('../controllers/bookplacecontrollers')
router.post("/book-place", getUserId, bookPlaceController.bookAplace);

module.exports = router;
