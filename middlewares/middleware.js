exports.validateMovie = (req,res,next)=>{
    const array = ["genre","rating","streaming_link"]
    array.forEach((element) => {
        if (!req.body[element]) return res.status(400).send({ message: `${element} is missing`, status: 400 });
    })
    next()
}