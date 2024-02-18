const { getAll, create, getOne, remove, update } = require('../controllers/director.controllers');
const express = require('express');

const directorRoute = express.Router();

directorRoute.route('/')
    .get(getAll)
    .post(create);

directorRoute.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = directorRoute;