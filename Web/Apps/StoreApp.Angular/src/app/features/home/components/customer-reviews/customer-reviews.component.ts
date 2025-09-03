import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from '../../../../shared/components/review/review.component';
import { Review } from '../../../../shared/models/review/review';

@Component({
  selector: 'app-customer-reviews',
  standalone: true,
  imports: [CommonModule, ReviewComponent],
  templateUrl: './customer-reviews.component.html',
  styleUrls: ['./customer-reviews.component.scss']
})
export class CustomerReviewsComponent {
  @Input() reviews: Review[] = [];
  @ViewChild('reviewsContainer', { static: true }) reviewsContainer!: ElementRef;

  scrollLeft() {
    if (this.reviewsContainer?.nativeElement) {
      this.reviewsContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight() {
    if (this.reviewsContainer?.nativeElement) {
      this.reviewsContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }
}
