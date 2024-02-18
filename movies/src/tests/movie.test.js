const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');

let id;

test('GET /movies debe de traer todos las peliculas', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});


test("POST /movies debe de crear una pelicula", async () => {
    const movie = {
        name: "Iron man",
        image: "http://image.png",
        synopsis: "example sinopsis",
        releaseYear: 2010
    }
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name);
});


test("PUT /movies/:id Debe actualizar una pelicula", async () => {
    const movie={
        name: "Iron man update"
    }
    const res = await request(app).put(`/movies/${id}`).send(movie)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(movie.name)
});

//Tests de updates de relaciones entre bases de datos

test('POST /movies/:id/genres Actualiza el genero de una pelicula ', async () => {
    const genre = await Genre.create({
        name: "Action",
    })
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/directors Actualiza el director de una pelicula ', async () => {
    const director = await Director.create({
        firstName: "Jon",
        lastName: "Favreau",
        nationality: "Usa",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Jon_Favreau_Deauville_2014.jpg/220px-Jon_Favreau_Deauville_2014.jpg",
        birthday: 2010
    })
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});


test('POST /movies/:id/actors Actualiza los actores de una pelicula ', async () => {
    const actor = await Actor.create({
        firstName: "Jon",
        lastName: "Favreau",
        nationality: "Usa",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Jon_Favreau_Deauville_2014.jpg/220px-Jon_Favreau_Deauville_2014.jpg",
        birthday: 1966
    })
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});



test("DELETE /movies/:id debe eliminar una pelicula", async () => {
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204);
});


