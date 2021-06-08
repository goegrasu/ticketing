import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@goegrasutickets/common';
import { Order, OrderStatus } from '../models/order';

const router = express.Router();

router.delete('/api/orders/:orderId', 
    // user is authenticated
    requireAuth,
    async (req: Request, res: Response) => {    
    
    // find the order
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
        throw new NotFoundError();
    }

    // check if order is the user logged in
    if (!order) {
        throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    // publishing an event saying this was cancelled

    res.status(204).send(order);
});

export { router as deleteOrderRouter };