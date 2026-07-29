import { reviewRepository } from '../repositories/review.repository';

export const reviewService = {
   getReviewsByProductId: async (productId: number) => {
      return reviewRepository.getReviewsByProductId(productId);
   },
   getReviewsSummaryByProductId: async (productId: number) => {
      const reviews = await reviewRepository.getReviewsByProductId(
         productId,
         10
      );
      const joinedReviews = reviews
         .map((review) => review.content)
         .join('\n\n');
      const summary = 'This is a placeholder summary.';
      return summary;
   },
};
