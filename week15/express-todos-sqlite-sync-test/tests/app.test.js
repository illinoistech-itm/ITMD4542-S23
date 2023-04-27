const request = require('supertest');
const app = require('../app');

describe('Test the root path', ()=>{
  it('Root - It should respond to the GET method with a 200', async ()=>{
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.header['content-type']).toMatch(/html/);
    expect(response.text).toMatch(/<h1>Express<\/h1>/);
  });

  it('It should respond to the GET method with a 404 on a path that does not exist', async ()=>{
    const response = await request(app).get('/nope');
    expect(response.status).toBe(404);
  });
});