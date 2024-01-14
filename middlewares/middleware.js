const jwt = require('jsonwebtoken');
const secretKey = 'validKey';

exports.validateMovie = (req,res,next)=>{
    const array = ["genre","rating","streaming_link"]
    array.forEach((element) => {
        if (!req.body[element]) return res.status(400).send({ message: `${element} is missing`, status: 400 });
    })
    next()
}

exports.validateRole = (req,res,next)=>{
    try{
        const {body} = req
        if(req.headers.authorization && req.headers.authorization.split(' ').length === 2) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,secretKey)

            console.log('decoded',decoded)
            if(decoded.role !== "admin"){
                return res.status(400).send({message:"no access"})
            }
            next()
        }else{
            return res.status(400).send({message:"token not provided"})
        }
    }catch(err){
        console.log('Token verification failed');
        return res.status(400).send({message:"error"})
    }

}