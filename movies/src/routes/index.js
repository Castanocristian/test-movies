const express = require('express');
const actorRoute = require('./actor.route');
const directorRoute = require('./director.route');
const genreRoute = require('./genre.route');
const movieRoute = require('./movie.route');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres', genreRoute)
router.use('/actors', actorRoute)
router.use('/directors', directorRoute)
router.use('/movies', movieRoute)

module.exports = router;