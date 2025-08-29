export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  discount?: number;
  rating: number;
  unitsInStock: number;
}
