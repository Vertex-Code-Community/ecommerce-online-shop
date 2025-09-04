import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, delay, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Review } from '../../shared/models/review/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = `${environment.apiUrl}`;

  http: HttpClient = inject(HttpClient);

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    let statusCode = 500;

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      statusCode = error.status;
      errorMessage = error.message || 'Server error occurred';
    }

    return throwError(() => ({ message: errorMessage, statusCode }));
  }

  getReviewsByProductId(productId: number): Observable<Review[]> {
    if (!productId || productId <= 0) {
      return throwError(() => ({ message: 'Invalid product ID', statusCode: 400 }));
    }

    return this.http.get<Review[]>(`${this.apiUrl}/products/${productId}/reviews`)
      .pipe(catchError(this.handleError.bind(this)));

    // Mocked response for UI testing without backend
    const mockReviews: Review[] = createMockReviews(productId);
    return of(mockReviews).pipe(delay(300));
  }
}

function createMockReviews(productId: number): Review[] {
  const reviews: Review[] = [
    {
      id: productId * 10 + 1,
      productId,
      userName: 'Sarah M.',
      comment: 'I\'m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I\'ve bought has exceeded my expectations.',
      rating: 5,
      createdAt: new Date('2024-01-15')
    },
    {
      id: productId * 10 + 2,
      productId,
      userName: 'Alex K.',
      comment: 'Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable.',
      rating: 5,
      createdAt: new Date('2024-01-10')
    },
    {
      id: productId * 10 + 3,
      productId,
      userName: 'James L.',
      comment: 'As someone who\'s always on the lookout for unique fashion pieces, I\'m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.',
      rating: 4,
      createdAt: new Date('2024-01-08')
    },
    {
      id: productId * 10 + 4,
      productId,
      userName: 'Emily R.',
      comment: 'Great quality and fast shipping! The fabric feels premium and the fit is perfect. Will definitely order again.',
      rating: 5,
      createdAt: new Date('2024-01-05')
    },
    {
      id: productId * 10 + 5,
      productId,
      userName: 'Michael T.',
      comment: 'Good product overall, but delivery took longer than expected. Quality is decent for the price.',
      rating: 4,
      createdAt: new Date('2024-01-03')
    }
  ];

  return reviews;
}
