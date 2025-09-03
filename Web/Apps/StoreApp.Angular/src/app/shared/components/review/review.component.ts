import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRatingComponent } from '../product-rating/product-rating.component';
import { Review } from '../../models/review/review';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, ProductRatingComponent],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  @Input() review!: Review;
  @Input() width: string = '600px';
}
