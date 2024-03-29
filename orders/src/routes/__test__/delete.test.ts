import { OrderStatus } from '@goegrasutickets/common';
import request from 'supertest';
import { app }  from  '../../app';
import { Ticket } from '../../models/ticket';
import { Order } from '../../models/order';

it('marks an order as cacelled', async () => {
    
    // create a ticket with Ticket model
    const ticket = Ticket.build({
        title: 'concert',
        price: 10
    });
    await ticket.save();

    const user = global.signin();
    // make a request to create an order
    const { body: order} = await request(app)
            .post('/api/orders')
            .set('Cookie', user)
            .send({
                ticketId: ticket.id
            })
            .expect(201);

    // make a request to cancel the order
    await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204);

                

    // expectation to make suer the order is cancelled
    const updatedOrder = await Order.findById(order.id);
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it.todo('emits a order cancelled event');