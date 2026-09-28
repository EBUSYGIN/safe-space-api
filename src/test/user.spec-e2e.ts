import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
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

  it('login without body - error', async () => {
    const res = await request(application.app).post('/user/login');

    expect(res.statusCode).toBe(422);
  });

  it('login - success', async () => {
    const res = await request(application.app).post('/user/login').send({
      email: 'a@gmail.com',
      password: '123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).not.toBeUndefined();
  });

  it('login - error', async () => {
    const res = await request(application.app).post('/user/login').send({
      email: 'a@gmail.com',
      password: '13',
    });

    expect(res.statusCode).toBe(404);
  });

  // it('Info - success', async () => {
  //   const login = await request(application.app).post('/user/login').send({
  //     email: 'a@gmail.com',
  //     password: '123',
  //   });

  //   const res = await request(application.app)
  //     .get('/user/info')
  //     .set('Authorization', `Bearer ${login.body.token}`)
  //     .send();

  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.user.email).toBe('a@gmail.com');
  // });

  it('Info - error', async () => {
    const res = await request(application.app)
      .get('/user/info')
      .set('Authorization', `Bearer invalidtoken`)
      .send();

    expect(res.statusCode).toBe(401);
  });
});

afterAll(() => {
  application.close();
});
