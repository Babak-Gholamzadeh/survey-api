const dotenv = require('dotenv');
const path = require('path');
const request = require('supertest');
const app = require('../../app');
const faker = require('faker');
const { authService } = require('../../services');
const { User } = require('../../models');
const db = require('../../db');

dotenv.config({ path: path.join(__dirname, '../../.env') });

describe('Survey :: POST /surveys', () => {
  beforeEach(async () => {
    await db('user').dropCollection();
    await db('survey').dropCollection();
  });

  afterAll(async () => {
    await db('user').dropCollection();
    await db('survey').dropCollection();
  });

  it('should returns a new created survey id', async () => {
    const userData = {
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
    };
    const userId = await db('user').create(User(userData));
    const token = authService.generateToken(userId);

    const surveyData = {
      closeTime: faker.date.future(),
      question: faker.lorem.sentence(),
      options: faker.lorem.words(3).split(' '),
    };

    const res = await request(app)
      .post('/surveys')
      .send(surveyData)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual({
      _id: expect.any(String),
    });
  });

  it('should returns an unauthorized error', async () => {
    const userId = faker.lorem.sentence();
    const token = authService.generateToken(userId);

    const surveyData = {
      closeTime: faker.date.future(),
      question: faker.lorem.sentence(),
      options: faker.lorem.words(3).split(' '),
    };

    const res = await request(app)
      .post('/surveys')
      .send(surveyData)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json');

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
