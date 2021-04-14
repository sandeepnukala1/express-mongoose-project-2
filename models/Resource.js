const { Schema, model } = require('../db/connection')

const ResourceSchema = new Schema({
    resourceName: {type: String},
    resourceManager: {type: String},
    capacity: {type: Number, required: true},
    resourceType: {type: String, required: true},
    cost: {type: Number, required: true},
    project: {type: Schema.Types.ObjectId, ref: "Project"}

}, {timestamps: true})

const Resource = model("Resource", ResourceSchema)

module.exports = Resource;