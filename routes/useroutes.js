

const router = require("express").Router();
// const userControllers = require("../controllers/usercontroller");
const {
  userSignUp,
  userLogin,
  userSignOut,
} = require("../controllers/usercontroller");

router.post("/login", userLogin);

router.post("/sign-up", userSignUp);

//router.get("/sign-out", userSignOut);

module.exports = router;

// router.post('/login',userControllers.userLogin)

// router.post('/sign-up',userControllers.userSignUp)

// router.get ('/sign-out', userControllers.userSignOut)

// module.exports = router
