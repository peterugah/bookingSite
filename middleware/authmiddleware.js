const jwt = require('jsonwebtoken');
const User = require('../models/user')
const Admin = require('../models/adminreg')

const requireAuth = (req, res, next) => {
    const token = req.headers.jwt;
  
    // check json web token exists & is verified
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          console.error(err.message);
          res.send({"message":err.message,"error":"unauthorized!"})
        } else {
          console.log(decodedToken);
          res.send({"message":decodedToken})
          next();
        }
      });
    } else {
      res.send({"message":"invalidToken!"})
    }
  };

  // check current user
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


  const requireAdminAuth = (req, res, next) => {
    const token = req.headers.jwt;
  
    // check json web token exists 
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.error(err.message);
          res.send({"message":err.message,"error":"unauthorized!"})
        } else {
          console.log(decodedToken);
          //now check if the decoded tokn has a usertype property i.e is an admin
          let checkAdmin = await Admin.findOne({userType:decodedToken.userType})
          if (!checkAdmin) return res.status(401).send({message:"you are unauthorized to view this resource"})
          res.send({"message":decodedToken})
          next();
        }
      });
    } else {
      res.send({"message":"invalidToken!"})
    }
  };

module.exports = {requireAuth,checkUser,requireAdminAuth}