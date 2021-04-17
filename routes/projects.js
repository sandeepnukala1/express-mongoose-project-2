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

module.exports = router