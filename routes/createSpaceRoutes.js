const router = require('express').Router();
const {createSpace,updateSpace, getSpaceInfo , getAllSpace } = require('../controllers/spacecontroller')
router.post('/createSpace',createSpace);
router.get('/getSpaceInfo/:spaceId',getSpaceInfo);
router.patch('/update/:spaceId',updateSpace);
router.get('/get-all',getAllSpace);

module.exports = router;