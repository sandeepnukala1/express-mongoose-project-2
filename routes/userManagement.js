const router = require("express").Router()
const User = require("../models/User")
const Project = require("../models/Projects")
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

router.get("/:id/projectAllocations", AuthorizationCtrl.isAuthorized, async (req,res) => {
    const id = req.params.id
    const user = await User.findById(id).lean().exec()
    const assignedIds = user.projects
    const assignedProjects = await Project.find({ _id: {$in: assignedIds} }).lean().exec()
    const allProjects = await Project.find({}).lean().exec()
    const allocationObj = {
        projects: allProjects,
        assignedProjects: assignedProjects, 
        resourceId: user._id
    }
    console.log(allocationObj)
    res.render("userManagement/showProjects", { allocationObj })
})

router.post("/:id/projectAllocations", AuthorizationCtrl.isAuthorized, async (req, res) => {
    const id = req.body.project
    const project = await Project.findById(id)
    const resource = await User.findById(req.params.id)
    resource.projects.push(project)
    resource.save()
    res.redirect(`/userManagement/${req.params.id}`)
})


module.exports = router;