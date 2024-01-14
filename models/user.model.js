const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    _id: String,
    username: String,
    password: String,
    role: {
        type: String,
        enum: ['admin', 'user']
    },
    token : { type: String, required: true}

},
{
    versionKey: false
})

const user = new mongoose.model('user',userSchema)
module.exports = user