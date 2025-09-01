export interface CreateProduct {
  name: string;
  description?: string;
  price: number;
  imageData?: string; // base64
  discount?: number; // 0..1
  unitsInStock: number;
}
