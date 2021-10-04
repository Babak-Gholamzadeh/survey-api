const dotenv = require('dotenv');
const path = require('path');
const request = require('supertest');
const app = require('../../app');
const faker = require('faker');
const { authService } = require('../../services');
const { Survey, User } = require('../../models');
const db = require('../../db');

dotenv.config({ path: path.join(__dirname, '../../.env') });

describe('Survey :: GET /surveys', () => {
  beforeEach(async () => {
    await db('user').dropCollection();
    await db('survey').dropCollection();
  });

  afterAll(async () => {
    await db('user').dropCollection();
    await db('survey').dropCollection();
  });

  it('should returns all the surveys', async () => {
    const userData = {
      email: faker.internet.email().toLocaleLowerCase(),
      password: faker.internet.password(),
    };
    const userId = await db('user').create(User(userData));
    const token = authService.generateToken(userId);

    const surveys = [];
    for (let i = 0; i < 5; i++) {
      const surveyData = {
        closeTime: faker.date.future(),
        question: faker.lorem.sentence(),
        options: faker.lorem.words(3).split(' '),
      };
      const survey = Survey({ creatorId: userId, ...surveyData });
      await db('survey').create(survey);
      surveys.push(survey);
    }

    const res = await request(app)
      .get('/surveys')
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.surveys.length).toEqual(surveys.length);
  });

  it('should returns an unauthorized error', async () => {
    const userId = faker.lorem.sentence();
    const token = authService.generateToken(userId);

    const res = await request(app)
      .get('/surveys')
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
