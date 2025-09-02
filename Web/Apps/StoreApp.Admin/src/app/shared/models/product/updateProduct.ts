import { CreateProduct } from './createProduct';

export interface UpdateProduct extends CreateProduct {
  id: number;
}
