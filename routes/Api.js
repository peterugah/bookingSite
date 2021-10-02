
const express = require('express');
const { hello } = require('../controllers/usercontroller');
const router = express.Router();


router.get('/hello',function(req,res){
    res.send('hello node!')
})

module.exports = router
