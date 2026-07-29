import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';

export const reviewController = {
   getReviewsByProductId: async (req: Request, res: Response) => {
      try {
         const productId = Number(req.params.id);
         if (isNaN(productId)) {
            res.status(400).json({ error: 'Invalid product ID' });
            return;
         }

         const reviews = await reviewService.getReviewsByProductId(productId);
         res.json(reviews);
      } catch (error) {
         console.error('Error fetching reviews:', error);
         res.status(500).json({
            error: 'Failed to fetch reviews',
            details: String(error),
         });
      }
   },
   getReviewsSummaryByProductId: async (req: Request, res: Response) => {
      try {
         const productId = Number(req.params.id);
         if (isNaN(productId)) {
            res.status(400).json({ error: 'Invalid product ID' });
            return;
         }

         const summary =
            await reviewService.getReviewsSummaryByProductId(productId);
         res.json({ summary });
      } catch (error) {
         console.error('Error fetching reviews:', error);
         res.status(500).json({
            error: 'Failed to fetch reviews',
            details: String(error),
         });
      }
   },
};
