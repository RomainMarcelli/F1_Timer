import mongoose from 'mongoose';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../server';
import User from '../models/userModel';

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => 'hashed_password'),
  compare: jest.fn((password: string, hashed: string) => password === 'password'), 
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mocked_token'),
}));

describe('User Controller Tests', () => {
    beforeAll(async () => {
        const mongoUri = 'mongodb://localhost:27017/testdb';
        if (mongoose.connection.readyState === 0) {
          await mongoose.connect(mongoUri);  // Se connecter seulement si pas déjà connecté
        }
      });
  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        email: 'test@example.com',
        password: 'password',
      });
  
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Utilisateur créé avec succès.');
    expect(res.body).toHaveProperty('token', 'mocked_token');
  
    const user = await User.findOne({ email: 'test@example.com' });
    expect(user).toBeTruthy();
    expect(user?.email).toBe('test@example.com');
  
    const isPasswordMatch = await bcrypt.compare('password', user?.password || '');
    expect(isPasswordMatch).toBe(true); // Vérifier que le mot de passe correspond
  });

  it('should return an error when trying to register with an existing email', async () => {
    // Créer un utilisateur avant le test
    await new User({
      email: 'test@example.com',
      password: 'hashed_password',
    }).save();

    const res = await request(app)
      .post('/api/users/register')
      .send({
        email: 'test@example.com',
        password: 'password',
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Cet email est déjà utilisé.');
  });

  it('should log in the user successfully', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'hashed_password',
    });
    await user.save();

    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'password', // Utiliser le bon mot de passe pour le test
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Connecté avec succès');
    expect(res.body).toHaveProperty('token', 'mocked_token');
  });

  it('should return an error for incorrect password', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'hashed_password',
    });
    await user.save();

    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'wrong_password', // Mauvais mot de passe
      });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message', 'Mot de passe incorrect.');
  });

  // Test pour récupérer tous les utilisateurs
  it('should get all users', async () => {
    await User.insertMany([
      { email: 'test1@example.com', password: 'hashed_password' },
      { email: 'test2@example.com', password: 'hashed_password' },
    ]);

    const res = await request(app).get('/api/users');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2); // Deux utilisateurs devraient être retournés
    expect(res.body[0]).toHaveProperty('email', 'test1@example.com');
    expect(res.body[1]).toHaveProperty('email', 'test2@example.com');
  });
});
