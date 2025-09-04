import { ProductDetail } from '../product/productDetail';

export interface CartItem {
  productId: number;
  quantity: number;
  productDetail: ProductDetail;
}