import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

declare global {
    namespace NodeJS {
        interface Global {
            signin(): Promise<string[]>
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

global.signin = async () => {
    // build a JWT payload { id, email }

    // create the JWT 

    // Build session object {jwt: MY_JWT}

    // Turn that session in JSON

    // Take JSON and encode it as base64

    // return a string thats the cookie with the encoded data

};