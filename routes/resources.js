///////////////////////////////
// Import Router
////////////////////////////////
const router = require("express").Router()
const User = require("../models/User")
const AuthorizationCtrl = require("../controllers/authorization")

///////////////////////////////
// Router Specific Middleware
////////////////////////////////
router.use(AuthorizationCtrl.addUserToRequest)

///////////////////////////////
// Router Routes
////////////////////////////////
router.get("/", AuthorizationCtrl.isAuthorized, async (req, res) => {
    const user = await User.findOne({ username: req.user.username })
    const projects = user.projects
    res.render("resources/resources", { projects })
})

router.get("/new", AuthorizationCtrl.isAuthorized, async (req, res) => {
    res.render("projects/createProject")
})

module.exports = router