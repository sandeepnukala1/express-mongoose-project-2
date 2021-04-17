///////////////////////////////
// Import Router
////////////////////////////////
const router = require("express").Router()
const User = require("../models/User")
const Project = require("../models/Projects")
const AuthorizationCtrl = require("../controllers/authorization")

///////////////////////////////
// Router Specific Middleware
////////////////////////////////
router.use(AuthorizationCtrl.addUserToRequest)

///////////////////////////////
// Router Routes
////////////////////////////////
router.get("/", AuthorizationCtrl.isAuthorized, async (req, res) => {
    const user = await User.findOne({username: req.user.username})
    const projectIds = user.projects
    let usersProjects = []
    if(user.role !== 'Admin') {
        usersProjects = await Project.find({ _id: {$in: projectIds} })
    } else {
        usersProjects = await Project.find({})
    }
    
    res.render("projects/projects", { projects: usersProjects })
})

router.get("/new", AuthorizationCtrl.isAuthorized, async (req, res) => {
    res.render("projects/createProject")
})

router.post("/new", AuthorizationCtrl.isAuthorized, async (req, res) => {
    const user = await User.findOne({ username: req.user.username })
    const project = await Project.create(req.body)
    if(user.role !== 'Admin') {
        user.projects.push(project)
        user.save()
    }
    res.redirect("/projects")
})

router.delete("/:id", AuthorizationCtrl.isAuthorized, async (req,res) => {
    const id = req.params.id
    await Project.findByIdAndDelete(id)
    res.redirect("/projects")
})

router.put("/:id", AuthorizationCtrl.isAuthorized, async (req,res) => {
    const id = req.params.id
    await Project.findByIdAndUpdate(id, req.body, {new: true})
    res.redirect("/projects")
})

router.get("/:id", AuthorizationCtrl.isAuthorized, async (req,res) => {
    const id = req.params.id
    const project = await Project.findById(id)
    res.render("projects/showProject", { project })
})

module.exports = router