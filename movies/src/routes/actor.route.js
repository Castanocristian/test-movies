const { getAll, create, getOne, remove, update } = require('../controllers/actor.controllers');
const express = require('express');

const actorRoute = express.Router();

actorRoute.route('/')
    .get(getAll)
    .post(create);

actorRoute.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = actorRoute;