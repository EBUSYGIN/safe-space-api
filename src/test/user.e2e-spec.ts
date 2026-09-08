import { beforeAll } from '@jest/globals';
import request from 'supertest';
import { App } from '../app.js';
import { boot } from '../main.js';

let application: App;

beforeAll(async () => {
  const { app } = await boot;
  application = app;
});

describe('User e2e', () => {
  it('register - error', async () => {
    const res = await request(application.app).post('/user/register').send({
      email: 'a@gmail.com',
      name: 'Anton',
      password: '123',
    });

    expect(res.statusCode).toBe(422);
  });
});

afterAll(() => {
  application.close();
});
