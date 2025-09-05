import { ProductDetail } from '../product/productDetail';
import {Product} from '../product/product';

export interface CartItem {
  quantity: number;
  productDetail: ProductDetail;
  product: Product;
}
