const user = require('../models/user.model')
const jwt = require('jsonwebtoken');
const secretKey = 'validKey';
const UUID = require('uuid')
const bcrypt = require('bcrypt')

exports.createUser = async (req,res)=>{
    try{
        const {body} = req;
    const {username,password,role} = body;
    let alreadyUser = await user.findOne({username})
    if(alreadyUser){
        return res.status(400).send({message:"user already exist"})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
        _id : UUID.v4(),
        username,
        role,
        password: hashedPassword
    }
    const token = createToken(newUser)
    newUser.token = token
    const saved = await new user(newUser).save()
    console.log(newUser)
    return res.status(200).send({message:"user created", data:newUser})
    }catch(err){
        console.log(err)
        return res.send({data:err})
        

    }
}

function createToken(User) {
    const token = jwt.sign(User, secretKey, { expiresIn: '1h' });
    return token;
}