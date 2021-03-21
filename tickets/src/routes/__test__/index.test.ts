import request from 'supertest';
import { app } from '../../app';

const createTicket = (title: String, price: Number) => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: title,
            price: price
        });
}

it('can fetch a list of tickets', async () => {
    await createTicket('ceva', 20);
    await createTicket('altceva', 25);
    await createTicket('s-ar putea', 30);

    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);


    expect(response.body.length).toEqual(3);
});