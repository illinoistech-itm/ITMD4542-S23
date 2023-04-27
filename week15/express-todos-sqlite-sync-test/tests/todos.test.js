const request = require('supertest');
const app = require('../app');

describe('Test the todos routes', ()=>{
  it('GET /todos - should respond with a 200', async ()=>{
    const response = await request(app).get('/todos');
    expect(response.status).toBe(200);
    expect(response.text).toMatch(/<p>Welcome to Express Todos<\/p>/);
  });

  it('GET /todos/add - should respond with a 200 and the add form', async ()=>{
    const response = await request(app).get('/todos/add');
    expect(response.status).toBe(200);
    expect(response.text).toMatch(/<form method="POST" action="\/todos\/add">/);
  });

  it('POST /todos/add - should add entry to database and redirect', async ()=>{
    const response = await request(app).post('/todos/add')
    .send('todoText=BrianTEST')
    .send('todoEmail=x@x.com');
    expect(response.status).toBe(302);
    expect(response.header['location']).toMatch(/\/todos/);
  });
});