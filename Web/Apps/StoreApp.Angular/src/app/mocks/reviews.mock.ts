import { Review } from '../shared/models/review/review';

export const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    productId: 123,
    userName: 'Sarah M.',
    comment: 'I\'m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I\'ve bought has exceeded my expectations.',
    rating: 5,
    createdAt: new Date('2024-01-15')
  },
  {
    id: 2,
    productId: 123,
    userName: 'Alex K.',
    comment: 'Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable.',
    rating: 5,
    createdAt: new Date('2024-01-10')
  },
  {
    id: 3,
    productId: 123,
    userName: 'James L.',
    comment: 'As someone who\'s always on the lookout for unique fashion pieces, I\'m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.',
    rating: 4,
    createdAt: new Date('2024-01-08')
  },
  {
    id: 4,
    productId: 123,
    userName: 'Emily R.',
    comment: 'Great quality and fast shipping! The fabric feels premium and the fit is perfect. Will definitely order again.',
    rating: 5,
    createdAt: new Date('2024-01-05')
  },
  {
    id: 5,
    productId: 123,
    userName: 'Michael B.',
    comment: 'Good product overall, but the sizing runs a bit small. I had to exchange for a larger size.',
    rating: 4,
    createdAt: new Date('2024-01-03')
  },
  {
    id: 6,
    productId: 123,
    userName: 'Lisa W.',
    comment: 'Love the design and color! The material is soft and comfortable to wear.',
    rating: 5,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 7,
    productId: 123,
    userName: 'David C.',
    comment: 'Decent quality for the price. Delivery was quick and packaging was nice.',
    rating: 3,
    createdAt: new Date('2023-12-28')
  },
  {
    id: 8,
    productId: 123,
    userName: 'Anna S.',
    comment: 'Absolutely love this piece! It\'s become one of my favorite items in my wardrobe.',
    rating: 5,
    createdAt: new Date('2023-12-25')
  }
];
