///////////////////////////////
// Import Router
////////////////////////////////
const router = require("express").Router()
const User = require("../models/User")
const Resource = require("../models/Resource")
const AuthorizationCtrl = require("../controllers/authorization")

///////////////////////////////
// Router Specific Middleware
////////////////////////////////
router.use(AuthorizationCtrl.addUserToRequest)

///////////////////////////////
// Router Routes
////////////////////////////////
router.get("/", AuthorizationCtrl.isAuthorized, async (req, res) => {
    const resources = await Resource.find({})
    res.render("resources/resources", { resources })
})

router.get("/new", AuthorizationCtrl.isAuthorized, async (req, res) => {
    res.render("resources/createResource")
})

router.post("/new", AuthorizationCtrl.isAuthorized, async (req, res) => {
    const resource = req.body
    await Resource.create(resource, (error, addedResource) => {
        if(error) {
            console.log(error)
        } else {
            res.redirect("/resources")
        }
    })
})

module.exports = router