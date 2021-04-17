///////////////////////////////
// Import Router
////////////////////////////////
const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const AuthorizationCtrl = require("../controllers/authorization")

///////////////////////////////
// Router Specific Middleware
////////////////////////////////
router.use(AuthorizationCtrl.addUserToRequest)

///////////////////////////////
// Router Routes
////////////////////////////////
router.get("/", AuthorizationCtrl.isAuthorized, async (req, res) => {
    const resources = await User.find({})
    res.render("resources/resources", { resources })
})

router.get("/new", AuthorizationCtrl.isAuthorized, async (req, res) => {
    res.render("resources/createResource")
})

router.post("/new", AuthorizationCtrl.isAuthorized, async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, salt)
    const resource = req.body
    await User.create(resource, (error, addedResource) => {
        if(error) {
            console.log(error)
        } else {
            res.redirect("/resources")
        }
    })
})

module.exports = router