import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, delay, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    let statusCode = 500;

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      statusCode = error.status;
      errorMessage = error.message || 'Server error occurred';
    }

    return throwError(() => ({ message: errorMessage, statusCode }));
  }

  getPagedProducts(page: number, pageSize: number): Observable<PagedResult<Product>> {
    const safePage = Math.max(1, page || 1);
    const safePageSize = Math.max(1, pageSize || 10);

    const params = new HttpParams()
      .set('pageNumber', String(safePage))
      .set('pageSize', String(safePageSize));

    return this.http.get<PagedResult<Product>>(`${this.apiUrl}`, { params })
      .pipe(
        catchError(this.handleError.bind(this))
      );

    // Mocked response for UI testing without backend
    const allItems: Product[] = createMockProducts(57);
    const startIndex = (safePage - 1) * safePageSize;
    const pagedItems = allItems.slice(startIndex, startIndex + safePageSize);
    const result: PagedResult<Product> = {
      items: pagedItems,
      totalCount: allItems.length
    };
    return of(result).pipe(delay(200));
  }

  getProductById(id: number): Observable<FullProduct> {
    if (!id || id <= 0) {
      return throwError(() => ({ message: 'Invalid product ID', statusCode: 400 }));
    }

    return this.http.get<FullProduct>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );

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
    if (!product) {
      return throwError(() => ({ message: 'Product data is required', statusCode: 400 }));
    }

    return this.http.post<void>(`${this.apiUrl}`, product)
      .pipe(
        catchError(this.handleError.bind(this))
      );

    return of(void 0).pipe(delay(100));
  }

  updateProduct(product: UpdateProduct): Observable<void> {
    if (!product || !product.id) {
      return throwError(() => ({ message: 'Product ID is required for update', statusCode: 400 }));
    }

    return this.http.put<void>(`${this.apiUrl}`, product)
      .pipe(
        catchError(this.handleError.bind(this))
      );

    return of(void 0).pipe(delay(100));
  }

  deleteProductById(id: number): Observable<void> {
    if (!id || id <= 0) {
      return throwError(() => ({ message: 'Invalid product ID', statusCode: 400 }));
    }

    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );

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
      discount: (i % 4 === 0) ? 0.15 : undefined,
      rating: 3 + (i % 3),
      unitsInStock: 10 + (i % 25)
    });
  }
  return products;
}
