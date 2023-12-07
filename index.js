const express = require('express')
const mongoose = require('mongoose')
const app = express()

const PORT = 3000;
const routes = require('./routes/route')

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use('/movies',routes)

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect("mongodb+srv://movies_app:movies_app%40123@cluster0.30p3mdy.mongodb.net/",connectionParams)
  .then(() => {
    app.listen(PORT,(err) => {
        if(err) console.log("error occur while listening",PORT)
        console.log("server running successfully")
    })
  })
  .catch((error) => {
    console.log('error in mongoConnection',error)
  })