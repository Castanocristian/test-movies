const { getAll, create, getOne, remove, update, setMovieGenre, setMovieActors, setMovieDirectors } = require('../controllers/movie.controllers');
const express = require('express');

const movieRoute = express.Router();

movieRoute.route('/')
    .get(getAll)
    .post(create);

movieRoute.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);


movieRoute.route('/:id/genres')
    .post(setMovieGenre)



movieRoute.route('/:id/actors')
    .post(setMovieActors)


movieRoute.route('/:id/directors')
    .post(setMovieDirectors)



module.exports = movieRoute;