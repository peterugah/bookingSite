const router = require('express').Router()
const { adminregLogin, adminregSignUp,approveBusiness } = require('../controllers/adminregcontrollers')
const {requireAdminAuth} = require('../middleware/authmiddleware')

router.post('/adminreg/login',adminregLogin)

router.post('/adminreg/sign-up',adminregSignUp)

router.put('/admin/business-affirm/:id',requireAdminAuth, approveBusiness)
module.exports =router