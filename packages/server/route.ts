import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';
import { reviewController } from './controllers/review.controller';
import express from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.send('Hello World from the server package!');
});
router.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello World from the server package!' });
});
router.post('/api/chat', chatController.sendMessage);

router.get('/api/products/:id/reviews', reviewController.getReviewsByProductId);
router.post(
   '/api/products/:id/reviews/summary',
   reviewController.getReviewsSummaryByProductId
);

export default router;
