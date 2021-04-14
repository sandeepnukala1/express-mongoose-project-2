///////////////////////////////
// Import Router
////////////////////////////////
const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require('../models/User')

///////////////////////////////
// Router Specific Middleware
////////////////////////////////

///////////////////////////////
// Router Routes
////////////////////////////////
router.get("/", (req, res) => {
    res.render("home")
})

router.get("/auth/signup", (req, res) => {
    res.render("auth/signup")
})

router.post("/auth/signup", async (req, res) => {
  try {
    // generate salt for hashing
    const salt = await bcrypt.genSalt(10)
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, salt)
    // Create the User
    await User.create(req.body)
    // Redirect to login page
    res.redirect("/auth/login")
  } catch (error) {
    res.json(error)
  }
})

router.get("/auth/login", (req, res) => {
    res.render("auth/login")
})

router.post("/auth/login", async (req, res) => {
    try {
      //check if the user exists (make sure to use findOne not find)
      const user = await User.findOne({ username: req.body.username })
      if (user) {
        // check if password matches
        const result = await bcrypt.compare(req.body.password, user.password)
        if (result) {
          // create user session property
          req.session.userId = user._id
          //redirect to main page
          res.send("logged in")
        } else {
          // send error is password doesn't match
          res.json({ error: "passwords don't match" })
        }
      } else {
        // send error if user doesn't exist
        res.json({ error: "User does not exist" })
      }
    } catch (error) {
      res.json(error)
    }
  })

router.get("/auth/logout", (req, res) => {
    // remove the user property from the session
    req.session.userId = null
    // redirect back to the main page
    res.redirect("/")
  })


///////////////////////////////
// Export Router
////////////////////////////////
module.exports = router