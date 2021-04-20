///////////////////////////////
// Import Router
////////////////////////////////
const router = require("express").Router()
const User = require("../models/User")
const Project = require("../models/Projects")
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
    const resources = await User.find({}).lean().exec()
    let newResources = []
    newResources = resources.map(r => {
        r.loggedInRole = req.user.role
        return r
    })
    console.log(newResources)
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

router.delete("/:id", AuthorizationCtrl.isAuthorized, async (req,res) => {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    res.redirect("/resources")
})

router.put("/:id", AuthorizationCtrl.isAuthorized, async (req,res) => {
    const id = req.params.id
    const salt = await bcrypt.genSalt(10)
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, salt)
    await User.findByIdAndUpdate(id, req.body, {new: true})
    res.redirect("/resources")
})

router.get("/:id", AuthorizationCtrl.isAuthorized, async (req,res) => {
    const id = req.params.id
    const resource = await User.findById(id)
    res.render("resources/showResource", { resource })
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
    res.render("resources/showProjects", { allocationObj })
})

router.post("/:id/projectAllocations", AuthorizationCtrl.isAuthorized, async (req, res) => {
    const id = req.body.project
    const project = await Project.findById(id)
    const resource = await User.findById(req.params.id)
    resource.projects.push(project)
    resource.save()
    res.redirect(`/resources/${req.params.id}`)
})

module.exports = router