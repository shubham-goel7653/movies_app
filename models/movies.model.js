const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title: {type: String, required: true},
    genre: {type: String, required: true},
    rating: {type: String, required: true},
    streaming_link: {type: String, required: true}
},
{
    versionKey: false
})

const movie = new mongoose.model('movie',schema)
module.exports = movie