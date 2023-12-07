const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')
const middleware = require('../middlewares/middleware')

router.post('/movieRoute',middleware.validateMovie,controller.createMovie)
router.post('/addMovie',middleware.validateMovie,controller.addMovie)
router.get('/getMovies',controller.getMovie)
router.get('/searchMovie',controller.searchMovie)
router.put('/updateMovie/:id',controller.updateMovie)
router.delete('/deleteMovie/:id',controller.deleteMovie)


module.exports = router