const { Schema, model } = require('../db/connection')

const ProjectSchema = new Schema({
    projectName: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    notes: {type: String},
    projectManager: {type: String, required: true},
    resources: [{type: Schema.Types.ObjectId, ref: "Resource"}]
}, {timestamps: true})

const Project = model("Project", ProjectSchema)

module.exports = Project;