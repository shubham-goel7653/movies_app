require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const PORT = process.env.PORT || 3000;
const movieRoute = require('./routes/movieRoute')
const userRoute = require('./routes/userRoute')

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use('/movie',movieRoute)
app.use('/user',userRoute)

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(process.env.DB_URL,connectionParams)
  .then(() => {
    app.listen(PORT,(err) => {
        if(err) console.log("error occur while listening",PORT)
        console.log("server running successfully")
    })
  })
  .catch((error) => {
    console.log('error in mongoConnection',error)
  })