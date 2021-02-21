import express from 'express';
import { currentUser } from '@goegrasutickets/common';

const router = express.Router();

router.get('/api/users/currentuser',     
    currentUser,
    (req, res) => {
        // if req.currentUser is not set it will return undefined so we added the null 
        res.send({ currentUser: req.currentUser || null });
    }
);

export {router as currentUserRouter};