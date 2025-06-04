// test/api.test.js
const request = require('supertest');
const express = require('express');
const { expect } = require('chai');

// Import the original app (modify if your app is not modular)
const app = require('../index');

describe('Express API', () => {
  it('GET / should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('Hello from Express API! 123456');
  });

  it('GET /api/users should return users list', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
  });

  it('POST /api/users should create user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Charlie' });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message', 'User created successfully!');
    expect(res.body.user).to.have.property('name', 'Charlie');
  });
});
