const { Schema, model } = require('../db/connection')

const UserSchema = new Schema({
    username: {type: String},
    password: {type: String, required: true},
    role: {type: String, required: true},
    resourceManager: {type: String},
    capacity: {type: Number, required: true},
    resourceType: {type: String, required: true},
    cost: {type: Number, required: true},
    projects: [{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }]
}, {timestamps: true})

const User = model("user", UserSchema)

module.exports = User;