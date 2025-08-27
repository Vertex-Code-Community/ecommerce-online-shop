import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    const pageZeroBased = Math.max(0, page - 1);
    const params = new HttpParams()
      .set('page', String(page))
      .set('pageNumber', String(page))
      .set('pageIndex', String(pageZeroBased))
      .set('pageSize', String(pageSize));

    return this.http.get<PagedResult<Product>>(`${this.apiUrl}/paged`, { params });
  }

  getProductById(id: number): Observable<FullProduct> {
    return this.http.get<FullProduct>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: CreateProduct): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, product);
  }

  updateProduct(product: UpdateProduct): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}`, product);
  }

  deleteProductById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
