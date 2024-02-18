const request = require('supertest');
const app = require('../app');
require('../models');

let id;


test('GET /actors debe de traer todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});


test("POST /actors debe de crear un actor", async () => {
    const artist = {
        firstName: "Robert",
        lastName: "Downie",
        nationality: "Usa",
        image: "http://image.png",
        birthday: 1965
    }
    const res = await request(app).post('/actors').send(artist);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(artist.name);
});


test("PUT /actors/:id Debe actualizar un actor", async () => {
    const artist={
        firstName: "Robert Update"
    }
    const res = await request(app).put(`/actors/${id}`).send(artist)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(artist.name)
});

test("DELETE /actors/:id debe eliminar un actor", async () => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204);
});