const User = require('../models/User')

const addUserToRequest = async (req, res, next) => {
    if (req.session.userId) {
      req.user = await User.findById(req.session.userId)
      next()
    } else {
      next()
    }
  }
  
  // Auth Middleware Function to check if user authorized for route
  const isAuthorized = (req, res, next) => {
    // check if user session property exists, if not redirect back to login page
    if (req.user) {
      //if user exists, wave them by to go to route handler
      next()
    } else {
      //redirect the not logged in user
      res.redirect("/auth/login")
    }
  }

  module.exports = {
      addUserToRequest,
      isAuthorized
  }