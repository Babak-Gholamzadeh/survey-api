const dotenv = require('dotenv');
const path = require('path');
const request = require('supertest');
const app = require('../../app');
const faker = require('faker');
const { User } = require('../../models');
const db = require('../../db');
const jwt = require('jsonwebtoken');

dotenv.config({ path: path.join(__dirname, '../../.env') });

describe('Auth :: POST /login', () => {
  beforeEach(async () => {
    await db('user').dropCollection();
  });

  afterAll(async () => {
    await db('user').dropCollection();
  });

  it('should returns a valid JWT token', async () => {
    const userData = {
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
    };

    const userId = await db('user').create(User(userData));

    const res = await request(app)
      .post('/login')
      .send(userData)
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual({
      token: expect.any(String),
    });

    const { body: { data: { token } } } = res;
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { data: { _id } } = decode;
    
    expect(_id).toBe(userId);
  });

  it('should returns an error and fail login with incorrect email', async () => {
    const userData = {
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
    };

    const userId = await db('user').create(User(userData));

    userData.email = faker.internet.email().toLocaleLowerCase();

    const res = await request(app)
      .post('/login')
      .send(userData)
      .set('Accept', 'application/json');

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toEqual({
      defaultMessage: ['username/password is incorrect']
    });
  });

  it('should returns an error and fail login with incorrect password', async () => {
    const userData = {
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
    };

    const userId = await db('user').create(User(userData));

    userData.password = faker.internet.password();

    const res = await request(app)
      .post('/login')
      .send(userData)
      .set('Accept', 'application/json');

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toEqual({
      defaultMessage: ['username/password is incorrect']
    });
  });
});
