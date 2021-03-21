import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
    namespace NodeJS {
        interface Global {
            signin(): string[];
        }
    }
}

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'whatever';

    mongo = new MongoMemoryServer();

    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {

    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = () => {

    // build a JWT payload { id, email }
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    }

    // create the JWT 
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build session object {jwt: MY_JWT}
    const session = { jwt: token };

    // Turn that session in JSON
    const sessionJSON = JSON.stringify(session);

    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string thats the cookie with the encoded data
    // returning an array because of supertest 
    return [`express:sess=${base64}`];
};