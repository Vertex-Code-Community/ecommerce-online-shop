import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { PagedResult } from '../../shared/models/pagedResultT';
import { environment } from '../../../environments/environment';
import { Product } from '../../shared/models/product/product';
import { FullProduct } from '../../shared/models/product/fullProduct';
import { CreateProduct } from '../../shared/models/product/createProduct';
import { UpdateProduct } from '../../shared/models/product/updateProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/product`;

  http: HttpClient = inject(HttpClient);

  getPagedProducts(page: number, pageSize: number): Observable<PagedResult<Product>> {
    if (page <= 0) {
      page = 1;
    }

    if (pageSize <= 0) {
      pageSize = 10;
    }

    // const params = new HttpParams()
    //   .set('pageNumber', String(page))
    //   .set('pageSize', String(pageSize));
    // return this.http.get<PagedResult<Product>>(`${this.apiUrl}`, { params });

    // Mocked response for UI testing without backend
    const allItems: Product[] = createMockProducts(57);
    const startIndex = (page - 1) * pageSize;
    const pagedItems = allItems.slice(startIndex, startIndex + pageSize);
    const result: PagedResult<Product> = {
      items: pagedItems,
      totalCount: allItems.length
    };
    return of(result).pipe(delay(200));
  }

  getProductById(id: number): Observable<FullProduct> {
    // return this.http.get<FullProduct>(`${this.apiUrl}/${id}`);
    const product: FullProduct = {
      id,
      name: `Product #${id}`,
      description: `Mocked description for product #${id}.`,
      price: 49.99,
      imageUrl: '/mock.png',
      discount: 0.1,
      rating: 4.2,
      unitsInStock: 42,
      details: [
        {
          id: id * 10 + 1,
          colorName: 'Black',
          colorHex: '#000000',
          sizeName: 'M',
          unitsInStock: 10,
          sku: `SKU-${id}-BLK-M`,
          imageUrls: ['/mock.png']
        },
        {
          id: id * 10 + 2,
          colorName: 'Silver',
          colorHex: '#C0C0C0',
          sizeName: 'L',
          unitsInStock: 8,
          sku: `SKU-${id}-SLV-L`,
          imageUrls: ['/mock.png']
        }
      ]
    };
    return of(product).pipe(delay(150));
  }

  addProduct(product: CreateProduct): Observable<void> {
    // return this.http.post<void>(`${this.apiUrl}`, product);
    return of(void 0).pipe(delay(100));
  }

  updateProduct(product: UpdateProduct): Observable<void> {
    // return this.http.put<void>(`${this.apiUrl}`, product);
    return of(void 0).pipe(delay(100));
  }

  deleteProductById(id: number): Observable<void> {
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
    return of(void 0).pipe(delay(100));
  }
}

function createMockProducts(total: number): Product[] {
  const products: Product[] = [];
  for (let i = 1; i <= total; i++) {
    products.push({
      id: i,
      name: `Mock Product ${i}`,
      description: `This is a mocked product used for UI testing. Item ${i}.`,
      price: Number((10 + (i % 10) * 3.5).toFixed(2)),
      imageUrl: '/mock.png',
      discount: (i % 4 === 0) ? 0.15 : undefined,
      rating: 3 + (i % 3),
      unitsInStock: 10 + (i % 25)
    });
  }
  return products;
}
