
const movie = require('../models/movies.model')
const {ObjectId} = require('mongodb')

exports.createMovie = async (req,res)=>{
    try{
        const {body} = req;
    const {title,genre,rating,streaming_link} = body;
    
    let alreadyMovie = await movie.findOne({title})
    if(alreadyMovie){
        return res.status(400).send({message:"movie already exist"})
    }
    const newMovie = new movie({
        title,genre,rating,streaming_link
    })
    const saved = await newMovie.save()
    console.log(saved)
    return res.status(200).send({message:"movie created"})
    }catch(err){
        console.log(err)
        return res.status(400).send({message:"error while creating movie"})
    }
}
exports.addMovie = async (req,res)=>{
    try{
        const {body} = req;
    const {title,genre,rating,streaming_link} = body;
    
    let alreadyMovie = await movie.findOne({title})
    if(alreadyMovie){
        return res.status(400).send({message:"movie already exist"})
    }
    const added = await movie.insertMany({title,genre,rating,streaming_link})
    console.log(added)
    return res.status(200).send({message:"movie added"})

    }catch(err){
        console.log(err)
        return res.status(400).send({message:"error while adding movie"})

    }
}
exports.getMovie = async (req,res)=>{
    try{
        const movies = await movie.find()
        console.log(movies)
        return res.status(200).send({data:movies})
    }catch(err){
        console.log(err)
        return res.status(400).send({message:"error in getting movies"})
    }
}
exports.searchMovie = async (req,res)=>{
    try{
        const {body} = req
        const filter = body
        const searchedMovie = await movie.find(filter)
        console.log(searchedMovie)
        res.status(200).send({data:searchedMovie})
    }catch(err){
        console.log(err)
        return res.status(400).send({message:"error in searching movies"})
    }
}
exports.updateMovie = async(req,res)=>{
        try{
            const {body} = req
        let updateObj = {$set : {}}
        const filter = {_id : new ObjectId(req.params.id)}
        let alreadyMovie = await movie.findOne(filter)
    if(!alreadyMovie){
        return res.status(400).send({message:"movie not exist"})
    }
        updateObj.$set.title = body?.title;
        updateObj.$set.genre = body?.genre;
        updateObj.$set.rating = body?.rating;
        updateObj.$set.streaming_link = body?.streaming_link
        const updatedMovie = await movie.updateMany(filter,updateObj)
        console.log(updatedMovie)
        return res.status(200).send({message:"updated successfully"})
        }catch(err){
            console.log(err)
            return res.status(400).send({message:"error while updating"})
        }
}
exports.deleteMovie = async (req,res)=>{
    try{
        const filter = {_id : new ObjectId(req.params.id)}
        let alreadyMovie = await movie.findOne(filter)
    if(!alreadyMovie){
        return res.status(400).send({message:"movie not exist"})
    }
        const deleted = await movie.deleteOne(filter)
        console.log(deleted)
        return res.status(200).send({message:"successfully deleted"})
    }catch(err){
        console.log(err)
        return res.status(200).send({message:"error while deleting"})
    }

}