import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from '../../../../shared/components/review/review.component';
import { Review } from '../../../../shared/models/review/review';

export enum ReviewSortOptions {
  Latest = 'latest',
  HighestRating = 'highest',
  LowestRating = 'lowest'
}

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, ReviewComponent],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss'
})
export class ReviewListComponent {
  @Input() reviews: Review[] = [];
  @Input() isReadOnly: boolean = false;
  @Input() isLoading: boolean = false;
  @Output() writeReviewClicked = new EventEmitter<void>();

  selectedSortOption: ReviewSortOptions = ReviewSortOptions.Latest;
  showAllReviews: boolean = false;

  readonly ReviewSortOptions = ReviewSortOptions;
  readonly sortOptions = [
    { value: ReviewSortOptions.Latest, label: 'Latest' },
    { value: ReviewSortOptions.HighestRating, label: 'Highest' },
    { value: ReviewSortOptions.LowestRating, label: 'Lowest' }
  ];

  get displayedReviews(): Review[] {
    let sortedReviews = [...this.reviews];

    switch (this.selectedSortOption) {
      case ReviewSortOptions.Latest:
        sortedReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case ReviewSortOptions.HighestRating:
        sortedReviews.sort((a, b) => b.rating - a.rating);
        break;
      case ReviewSortOptions.LowestRating:
        sortedReviews.sort((a, b) => a.rating - b.rating);
        break;
    }

    return this.showAllReviews ? sortedReviews : sortedReviews.slice(0, 6);
  }

  get toggleButtonText(): string {
    return this.showAllReviews ? 'Hide' : 'Load More Reviews';
  }

  get shouldShowToggleButton(): boolean {
    return this.reviews.length > 6;
  }

  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedSortOption = target.value as ReviewSortOptions;
  }

  toggleShowAll(): void {
    this.showAllReviews = !this.showAllReviews;
  }

  onWriteReview(): void {
    this.writeReviewClicked.emit();
  }
}