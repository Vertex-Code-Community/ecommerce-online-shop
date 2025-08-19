import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { PagedResult } from '../models/pagedResultT';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`, { withCredentials: true });
  }

  getPagedProducts(page: number, pageSize: number): Observable<PagedResult<Product>> {
    const pageZeroBased = Math.max(0, page - 1);
    const params = new HttpParams()
      .set('page', String(page))
      .set('pageNumber', String(page))
      .set('pageIndex', String(pageZeroBased))
      .set('pageSize', String(pageSize));

    return this.http.get<PagedResult<Product>>(`${this.apiUrl}/paged`, {
      params,
      withCredentials: true
    });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  addProduct(product: Product): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, product, { withCredentials: true });
  }

  updateProductById(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, product, { withCredentials: true });
  }

  deleteProductById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
