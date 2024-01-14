const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movieController')
const middleware = require('../middlewares/middleware')

router.post('/createMovie',middleware.validateMovie,movieController.createMovie)
router.get('/getMovies',movieController.getMovie)
router.get('/searchMovie',middleware.validateRole,movieController.searchMovie)
router.put('/updateMovie/:id',middleware.validateRole,movieController.updateMovie)
router.delete('/deleteMovie/:id',middleware.validateRole,movieController.deleteMovie)


module.exports = router