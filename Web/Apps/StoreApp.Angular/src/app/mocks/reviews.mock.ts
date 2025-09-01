import { Review } from '../shared/models/review/review';

export const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    productId: 1,
    userName: 'Sarah M.',
    rating: 5.0,
    comment: 'I\'m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I\'ve bought has exceeded my expectations.',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 2,
    productId: 1,
    userName: 'Alex K.',
    rating: 5.0,
    comment: 'Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.',
    createdAt: new Date('2024-01-20')
  },
  {
    id: 3,
    productId: 1,
    userName: 'James L.',
    rating: 5.0,
    comment: 'As someone who\'s always on the lookout for unique fashion pieces, I\'m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.',
    createdAt: new Date('2024-01-25')
  },
  {
    id: 4,
    productId: 1,
    userName: 'Emma R.',
    rating: 5.0,
    comment: 'The customer service at Shop.co is exceptional. They helped me find the perfect outfit for my special occasion, and the quality was outstanding. Highly recommend!',
    createdAt: new Date('2024-02-01')
  },
  {
    id: 5,
    productId: 1,
    userName: 'Michael T.',
    rating: 5.0,
    comment: 'I\'ve been shopping here for months now and every purchase has been a great experience. The clothes fit perfectly and the materials are top-notch quality.',
    createdAt: new Date('2024-02-05')
  },
  {
    id: 6,
    productId: 1,
    userName: 'Lisa P.',
    rating: 5.0,
    comment: 'Shop.co has become my go-to destination for fashion. Their collection is always fresh, trendy, and the prices are reasonable for the quality you get.',
    createdAt: new Date('2024-02-10')
  },
  {
    id: 7,
    productId: 1,
    userName: 'David W.',
    rating: 5.0,
    comment: 'I love how easy it is to find exactly what I\'m looking for on Shop.co. The search filters work perfectly and the recommendations are spot-on.',
    createdAt: new Date('2024-02-15')
  }
];
