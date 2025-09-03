import {Product} from './product';
import {ProductDetail} from './productDetail';

export interface FullProduct extends Product {
  details: ProductDetail[];
}
