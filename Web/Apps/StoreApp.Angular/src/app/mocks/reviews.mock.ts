import { Review } from '../shared/models/review/review';

export const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    productId: 1,
    userName: 'John Doe',
    rating: 4.5,
    comment: 'Great product! The quality is excellent and it fits perfectly.',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 2,
    productId: 1,
    userName: 'Jane Smith',
    rating: 5.0,
    comment: 'Absolutely love this! Highly recommended to everyone.',
    createdAt: new Date('2024-01-20')
  },
  {
    id: 3,
    productId: 1,
    userName: 'Mike Johnson',
    rating: 4.0,
    comment: 'Good product overall, but shipping took longer than expected.',
    createdAt: new Date('2024-01-25')
  }
];
