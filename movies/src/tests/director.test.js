const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test('GET /directors debe de traer todos los directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});


test("POST /directors debe de crear un director", async () => {
    const director = {
        firstName: "Jhon",
        lastName: "Doe",
        nationality: "Usa",
        image: "http://image.png",
        birthday: 1998
    }
    const res = await request(app).post('/directors').send(director);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(director.name);
});


test("PUT /directors/:id Debe actualizar un director", async () => {
    const director={
        firstName: "Jhon Update"
    }
    const res = await request(app).put(`/directors/${id}`).send(director)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(director.name)
});

test("DELETE /directors/:id debe eliminar un director", async () => {
    const res = await request(app).delete(`/directors/${id}`)
    expect(res.status).toBe(204);
});