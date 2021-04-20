const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const AuthorizationCtrl = require("../controllers/authorization")

router.use(AuthorizationCtrl.addUserToRequest)

router.get("/", AuthorizationCtrl.isAuthorized, async (req, res) => {
    const adminUsers = await User.find({ role: 'Admin' })
    res.render("userManagement/viewAdmins", { adminUsers })
})

router.get("/new", AuthorizationCtrl.isAuthorized, async (req, res) => {
    res.render("userManagement/createAdmin")
})

router.post("/new", AuthorizationCtrl.isAuthorized, async (req, res) => {
    req.body.role = 'Admin';
    const salt = await bcrypt.genSalt(10)
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, salt)
    const resource = req.body
    await User.create(resource, (error, addedResource) => {
        if(error) {
            console.log(error)
        } else {
            res.redirect("/userManagement")
        }
    })
})

router.delete("/:id", AuthorizationCtrl.isAuthorized, async (req,res) => {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    res.redirect("/userManagement")
})

router.put("/:id", AuthorizationCtrl.isAuthorized, async (req,res) => {
    const id = req.params.id
    const salt = await bcrypt.genSalt(10)
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, salt)
    await User.findByIdAndUpdate(id, req.body, {new: true})
    res.redirect("/userManagement")
})

router.get("/:id", AuthorizationCtrl.isAuthorized, async (req,res) => {
    const id = req.params.id
    const resource = await User.findById(id)
    res.render("userManagement/showAdmin", { resource })
})

module.exports = router;