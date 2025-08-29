import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '../../../../shared/models/review/review';
import { ProductRatingComponent } from '../../../../shared/components/product-rating/product-rating.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, ProductRatingComponent],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  @Input() review!: Review;
}
