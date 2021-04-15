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
    const usersProjects = await User.find({ projects: {$in: []} })
    console.log(usersProjects)
    const projects = await Project.find({}).populate("projects")
    console.log('Here i am', projects)
    res.render("projects/projects", { projects })
})

router.get("/new", AuthorizationCtrl.isAuthorized, async (req, res) => {
    res.render("projects/createProject")
})

router.post("/new", AuthorizationCtrl.isAuthorized, async (req, res) => {
    const user = await User.findOne({ username: req.user.username })
    const project = await Project.create(req.body)
    user.projects.push(project)
    user.save()
    res.redirect("/projects")
})

module.exports = router