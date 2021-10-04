const dotenv = require('dotenv');
const path = require('path');
const request = require('supertest');
const app = require('../../app');
const faker = require('faker');
const db = require('../../db');

dotenv.config({ path: path.join(__dirname, '../../.env') });

describe('Auth :: POST /register', () => {
  beforeEach(async () => {
    await db('user').dropCollection();
  });

  afterAll(async () => {
    await db('user').dropCollection();
  });

  it('should returns a success message', async () => {
    const userData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const res = await request(app)
      .post('/register')
      .send(userData)
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('should returns a duplicate error', async () => {
    const userData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await request(app)
      .post('/register')
      .send(userData)
      .set('Accept', 'application/json');

    const res = await request(app)
      .post('/register')
      .send(userData)
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toEqual({
      email: ['the email has already been taken']
    });
  });
});
