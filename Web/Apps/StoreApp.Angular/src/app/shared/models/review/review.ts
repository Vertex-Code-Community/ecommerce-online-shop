export interface Review {
  id: number;
  productId: number;
  userName: string;
  comment?: string;
  rating: number;
  createdAt: Date;
}
