const dotenv = require('dotenv');
const path = require('path');
const request = require('supertest');
const app = require('../../app');
const faker = require('faker');
const { authService } = require('../../services');
const { Survey, User } = require('../../models');
const db = require('../../db');

dotenv.config({ path: path.join(__dirname, '../../.env') });

describe('Survey :: DELETE /surveys/:surveyId', () => {
  beforeEach(async () => {
    await db('user').dropCollection();
    await db('survey').dropCollection();
  });

  afterAll(async () => {
    await db('user').dropCollection();
    await db('survey').dropCollection();
  });

  it('should returns a success message', async () => {
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
    const survey = Survey({ creatorId: userId, ...surveyData });
    const surveyId = await db('survey').create(survey);

    const res = await request(app)
      .delete(`/surveys/${surveyId}`)
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('should returns an unauthorized error', async () => {
    const userId = faker.lorem.sentence();
    const token = authService.generateToken(userId);

    const surveyData = {
      closeTime: faker.date.future(),
      question: faker.lorem.sentence(),
      options: faker.lorem.words(3).split(' '),
    };
    const survey = Survey({ creatorId: userId, ...surveyData });
    const surveyId = await db('survey').create(survey);

    const res = await request(app)
      .delete(`/surveys/${surveyId}`)
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
